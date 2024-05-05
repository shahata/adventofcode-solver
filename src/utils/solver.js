import * as path from 'node:path';
import * as process from 'node:process';
import { fileURLToPath, resolve } from 'node:url';
import { performance } from 'node:perf_hooks';
import { existsSync, readdirSync, writeFileSync } from 'node:fs';

import ProgressBar from 'progress';
import { chromium } from 'playwright';
import readInput from './read-input.js';
import { dayName } from './day-name.js';
import {
  downloadQuestion,
  downloadIndex,
  downloadInput,
  createSolver,
  tempLeaderboard,
  downloadIndexTicks,
} from './renderer.js';

let duration;
async function timerify(fn) {
  let start = performance.now();
  let result = await fn();
  let end = performance.now();
  duration = `(${Math.round(end - start)}ms)`;
  return result;
}

let __dirname = path.dirname(fileURLToPath(import.meta.url));

function solverFunction(year, day) {
  let solver = path.resolve(__dirname, '..', year, `${dayName(day)}.js`);
  if (!existsSync(solver)) {
    return undefined;
  }
  return async () => {
    let module = await import(`../${year}/${dayName(day)}.js`);
    let input = readInput(
      new URL(`../${year}/${dayName(day)}.js`, import.meta.url),
    );
    console.log(`Solution for ${year}/${dayName(day)}!!!`);
    console.log('----------------------------');
    if (module.day) {
      let { part1, part2 } = await timerify(() => module.day(input));
      console.log(`Part1: ${part1}`);
      console.log(`Part2: ${part2}`, duration);
    } else {
      let result1 = timerify(() => module.part1(input));
      console.log(`Part1: ${await result1}`, duration);
      let result2 = timerify(() => module.part2(input));
      console.log(`Part2: ${await result2}`, duration);
    }
    console.log('');
  };
}

function getDays(year) {
  try {
    return readdirSync(path.resolve(__dirname, '..', year))
      .filter(x => x.match(/^day\d+\.js$/))
      .map(x => parseInt(x.match(/\d+/).shift()))
      .sort((a, b) => a - b)
      .map(x => `${x}`);
  } catch {
    console.error(`must pass valid year in first argument`);
    process.exit(0);
  }
}

function getAllYears() {
  let directory = path.resolve(__dirname, '..');
  let years = readdirSync(directory).filter(x => x.match(/^\d\d\d\d$/));
  return years.sort((a, b) => parseInt(a) - parseInt(b));
}

async function takeScreenshots(year) {
  if (year !== getAllYears().at(-1)) return;
  let browser = await chromium.launch();
  let clip = { x: 0, y: 0, width: 1030, height: 420 };
  let page = await browser.newPage();
  await page.goto(resolve(import.meta.url, `../${year}/events.html`));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'static/screenshot-events.png', clip });
  await page.goto(resolve(import.meta.url, `../${year}/solver.html`));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'static/screenshot-solver.png', clip });
  await browser.close();
  let __dirname = path.dirname(fileURLToPath(import.meta.url));
  let index = path.resolve(__dirname, '..', '..', 'index.html');
  writeFileSync(
    index,
    `<meta http-equiv="refresh" content="0; URL=src/${year}/events.html">`,
  );
}

export async function solveAll(year, day, run = true) {
  if (day) {
    tempLeaderboard(year);
    let solver = solverFunction(year, day);
    if (solver) {
      await solver();
    } else {
      await createSolver(year, day);
    }
  } else {
    console.log(`Downloading questions (${year})...`);
    let days = getDays(year);
    var bar = new ProgressBar('[:bar] :percent', {
      total: days.length * 2 + downloadIndexTicks,
      width: 40,
    });
    await downloadIndex(year, bar, days.length * 2);
    for (let day of days) {
      await downloadQuestion(year, day, days.length * 2);
      bar.tick();
      await downloadInput(year, day);
      bar.tick();
    }
    await takeScreenshots(year);

    if (run) {
      for (let day of days) {
        let solver = solverFunction(year, day);
        await solver();
      }
    }
  }
}

export async function solveAllYears() {
  let years = getAllYears();
  for (let year of years) {
    await solveAll(year, undefined, false);
  }
}
