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
  let __dirname = path.dirname(fileURLToPath(import.meta.url));
  let src = path.resolve(__dirname, '..');
  let templates = path.resolve(src, '..', 'templates');
  let template = path.join(templates, isDayName(name) ? 'day' : name);
  let fileName = `${path.join(src, year, name)}.${extension}`;
  let result = Object.keys(model).reduce(
    (result, key) => result.replaceAll(`{{${key}}}`, model[key]),
    readFileSync(`${template}.template.${extension}`).toString(),
  );
  writeFileSync(fileName, result);
  return fileName;
}

export async function downloadQuestion(year, day, stars) {
  let question = await getQuestionPage(year, day);
  return renderTemplate(year, dayName(day), 'html', {
    question,
    year,
    day,
    stars,
  });
}

export async function downloadInput(year, day) {
  let input = await getDayInput(year, day);
  return renderTemplate(year, dayName(day), 'txt', { input });
}

export function tempLeaderboard(year) {
  let model = calcLeaderboard();
  if (model) {
    renderTemplate(year, 'leaderboard', 'html', { year, ...model });
  }
}

export let downloadIndexTicks = 7;
export async function downloadIndex(year, bar, stars) {
  renderTemplate(year, 'solver', 'html', { year, stars });
  bar.tick();
  let page = await getYearPage(year);
  renderTemplate(year, 'index', 'html', { year, page, stars });
  bar.tick();
  let events = await getEventsPage(year);
  renderTemplate(year, 'events', 'html', { year, page: events, stars });
  bar.tick();
  let leaderboards = await getLeaderboardJsons(year);
  renderTemplate(year, 'leaderboard', 'html', {
    year,
    ...calcLeaderboard(leaderboards),
    stars,
  });
  bar.tick();
  let end = await getEndPage(year).catch(() => undefined);
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
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = sec_num - hours * 3600 - minutes * 60;
  let pad = num => (num < 10 ? '0' : '') + num;
  return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

export async function createSolver(year, day) {
  inquirer.registerPrompt('timeout-confirm', TimeoutConfirm);
  let page = await getYearPage(year);
  if (page.match(new RegExp(`key = "${year}-(\\d+)-"`))) {
    let [, actual] = page.match(new RegExp(`key = "${year}-(\\d+)-"`));
    day = actual;
  }
  if (page.match(/server_eta = (\d+)/)) {
    let [, eta] = page.match(/server_eta = (\d+)/);
    let answers = await inquirer.prompt([
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

  let txtFileName = await downloadInput(year, day);
  let jsFileName = renderTemplate(year, dayName(day), 'js', {});
  let specFileName = renderTemplate(year, dayName(day), 'spec.js', {
    year,
    day: dayName(day),
  });
  [jsFileName, specFileName, txtFileName].forEach(fn =>
    console.log(`Created ${fn}`),
  );
  console.log('');
}
