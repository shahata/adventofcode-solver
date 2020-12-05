import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { fileURLToPath } from 'url';
import { dayName, isDayName } from './day-name.js';
import { calcLeaderboard } from './calc-leaderboard.js';
import {
  getDayInput,
  getQuestionPage,
  getYearPage,
  getEventsPage,
  getLeaderboardJsons,
  getEndPage,
  getStatics,
} from './scraper.js';

function renderTemplate(year, name, extension, model) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const src = path.resolve(__dirname, '..');
  const prefix = path.join(src, year, isDayName(name) ? name : name);
  const template = path.join(src, 'template', isDayName(name) ? 'day' : name);
  const fileName = `${prefix}.${extension}`;
  const result = Object.keys(model).reduce((result, key) => {
    return result.replace(new RegExp(`{{${key}}}`, 'g'), model[key]);
  }, fs.readFileSync(`${template}.${extension}.template`).toString());
  fs.writeFileSync(fileName, result);
  return fileName;
}

async function downloadStatics(statics, done) {
  return getStatics(statics, ({ name, content }) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const src = path.resolve(__dirname, '..');
    const fileName = path.join(src, 'static', name);
    fs.writeFileSync(fileName, content);
    done();
  });
}

export async function downloadQuestion(year, day) {
  const question = await getQuestionPage(year, day);
  return renderTemplate(year, dayName(day), 'html', { question, year, day });
}

export async function downloadInput(year, day) {
  const input = await getDayInput(year, day);
  return renderTemplate(year, dayName(day), 'txt', { input });
}

export function tempLeaderboard(year) {
  const page = calcLeaderboard();
  if (page) {
    renderTemplate(year, 'leaderboard', 'html', { year, page });
  }
}

export const downloadIndexTicks = 7;
export async function downloadIndex(year, bar) {
  renderTemplate(year, 'solver', 'html', { year });
  bar.tick();
  const page = await getYearPage(year);
  renderTemplate(year, 'index', 'html', { year, page });
  bar.tick();
  const events = await getEventsPage(year);
  renderTemplate(year, 'events', 'html', { year, page: events });
  bar.tick();
  const leaderboards = await getLeaderboardJsons(year);
  renderTemplate(year, 'leaderboard', 'html', {
    year,
    page: calcLeaderboard(leaderboards),
  });
  bar.tick();
  const end = await getEndPage(year).catch(() => undefined);
  if (end) {
    renderTemplate(year, 'end', 'html', { year, page: end });
  }
  bar.tick();
  await downloadStatics(['style.css', 'highcontrast.css'], () => bar.tick());
}

export async function createSolver(year, day) {
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'create',
      message: `Create solver ${year}/${dayName(day)}?`,
    },
  ]);
  if (answers.create) {
    const txtFileName = await downloadInput(year, day);
    const jsFileName = renderTemplate(year, dayName(day), 'js', {});
    const specFileName = renderTemplate(year, dayName(day), 'spec.js', {
      year,
      day: dayName(day),
    });
    [jsFileName, specFileName, txtFileName].forEach(fn =>
      console.log(`Created ${fn}`),
    );
    console.log('');
  }
}
