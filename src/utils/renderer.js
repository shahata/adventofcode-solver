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

export async function downloadQuestion(year, day) {
  const question = await getQuestionPage(year, day);
  return renderTemplate(year, dayName(day), 'html', { question, year, day });
}

export async function downloadInput(year, day) {
  const input = await getDayInput(year, day);
  return renderTemplate(year, dayName(day), 'txt', { input });
}

export async function downloadIndex(year) {
  const page = await getYearPage(year);
  renderTemplate(year, 'index', 'html', { year, page });
  const events = await getEventsPage(year);
  renderTemplate(year, 'events', 'html', { year, page: events });
  const leaderboards = await getLeaderboardJsons(year);
  renderTemplate(year, 'leaderboard', 'html', {
    year,
    page: calcLeaderboard(leaderboards),
  });
  const end = await getEndPage(year).catch(() => undefined);
  if (end) {
    renderTemplate(year, 'end', 'html', { year, page: end });
  }
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
    const jsFileName = renderTemplate(year, dayName(day), 'js', {});
    const specFileName = renderTemplate(year, dayName(day), 'spec.js', {
      year,
      day: dayName(day),
    });
    const txtFileName = await downloadInput(year, day);
    [jsFileName, specFileName, txtFileName].forEach(fn =>
      console.log(`Created ${fn}`),
    );
    console.log('');
  }
}
