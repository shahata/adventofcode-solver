import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync, writeFileSync } from 'node:fs';

import inquirer from 'inquirer';
import { dayName, isDayName } from './day-name.js';
import { calcLeaderboard } from './calc-leaderboard.js';
import {
  getDayInput,
  getQuestionPage,
  getYearPage,
  getEventsPage,
  getLeaderboardJsons,
  getEndPage,
  downloadStatic,
} from './scraper.js';
import TimeoutConfirm from '@shahata/inquirer-timeout-confirm-prompt';

function renderTemplate(year, name, extension, model) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const src = path.resolve(__dirname, '..');
  const template = path.join(src, 'templates', isDayName(name) ? 'day' : name);
  const fileName = `${path.join(src, year, name)}.${extension}`;
  const result = Object.keys(model).reduce(
    (result, key) => result.replaceAll(`{{${key}}}`, model[key]),
    readFileSync(`${template}.template.${extension}`).toString(),
  );
  writeFileSync(fileName, result);
  return fileName;
}

export async function downloadQuestion(year, day, stars) {
  const question = await getQuestionPage(year, day);
  return renderTemplate(year, dayName(day), 'html', {
    question,
    year,
    day,
    stars,
  });
}

export async function downloadInput(year, day) {
  const input = await getDayInput(year, day);
  return renderTemplate(year, dayName(day), 'txt', { input });
}

export function tempLeaderboard(year) {
  const model = calcLeaderboard();
  if (model) {
    renderTemplate(year, 'leaderboard', 'html', { year, ...model });
  }
}

export const downloadIndexTicks = 7;
export async function downloadIndex(year, bar, stars) {
  renderTemplate(year, 'solver', 'html', { year, stars });
  bar.tick();
  const page = await getYearPage(year);
  renderTemplate(year, 'index', 'html', { year, page, stars });
  bar.tick();
  const events = await getEventsPage(year);
  renderTemplate(year, 'events', 'html', { year, page: events, stars });
  bar.tick();
  const leaderboards = await getLeaderboardJsons(year);
  renderTemplate(year, 'leaderboard', 'html', {
    year,
    ...calcLeaderboard(leaderboards),
    stars,
  });
  bar.tick();
  const end = await getEndPage(year).catch(() => undefined);
  if (end) {
    renderTemplate(year, 'end', 'html', { year, page: end, stars });
  }
  bar.tick();
  downloadStatic('https://adventofcode.com/static/style.css');
  bar.tick();
  downloadStatic('https://adventofcode.com/static/highcontrast.css');
  bar.tick();
  downloadStatic('https://adventofcode.com/favicon.png');
  bar.tick();
}

function toHHMMSS(sec_num) {
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor((sec_num - hours * 3600) / 60);
  const seconds = sec_num - hours * 3600 - minutes * 60;
  const pad = num => (num < 10 ? '0' : '') + num;
  return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

export async function createSolver(year, day) {
  inquirer.registerPrompt('timeout-confirm', TimeoutConfirm);
  const page = await getYearPage(year);
  if (page.match(new RegExp(`key = "${year}-(\\d+)-"`))) {
    const [, actual] = page.match(new RegExp(`key = "${year}-(\\d+)-"`));
    day = actual;
  }
  if (page.match(/server_eta = (\d+)/)) {
    const [, eta] = page.match(/server_eta = (\d+)/);
    const answers = await inquirer.prompt([
      {
        type: 'timeout-confirm',
        timeout: eta,
        timeoutTips: t => `(${toHHMMSS(t)})`,
        name: 'create',
        message: `Create solver ${year}/${dayName(day)}?`,
      },
    ]);
    if (!answers.create) {
      return;
    }
  }

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
