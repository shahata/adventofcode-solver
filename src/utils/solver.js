import * as path from 'node:path';
import { fileURLToPath, resolve } from 'node:url';
import { performance } from 'node:perf_hooks';
import { existsSync, readdirSync } from 'node:fs';

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
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  duration = `(${Math.round(end - start)}ms)`;
  return result;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function solverFunction(year, day) {
  const solver = path.resolve(__dirname, '..', year, `${dayName(day)}.js`);
  if (!existsSync(solver)) {
    return undefined;
  }
  return async () => {
    const module = await import(`../${year}/${dayName(day)}.js`);
    const input = readInput(
      new URL(`../${year}/${dayName(day)}.js`, import.meta.url),
    );
    console.log(`Solution for ${year}/${dayName(day)}!!!`);
    console.log('----------------------------');
    if (module.day) {
      const { part1, part2 } = await timerify(() => module.day(input));
      console.log(`Part1: ${part1}`);
      console.log(`Part2: ${part2}`, duration);
    } else {
      const result1 = timerify(() => module.part1(input));
      console.log(`Part1: ${await result1}`, duration);
      const result2 = timerify(() => module.part2(input));
      console.log(`Part2: ${await result2}`, duration);
    }
    console.log('');
  };
}

function getDays(year) {
  try {
    return readdirSync(path.resolve(__dirname, '..', year))
      .filter(x => x.match(/^day\d+\.js$/))
      .map(x => `${parseInt(x.match(/\d+/).shift())}`);
  } catch (e) {
    console.error(`must pass valid year in first argument`);
    process.exit(0);
  }
}

function getAllYears() {
  const directory = path.resolve(__dirname, '..');
  let years = readdirSync(directory).filter(x => x.match(/^\d\d\d\d$/));
  return years.sort((a, b) => parseInt(a) - parseInt(b));
}

async function takeScreenshots(year) {
  if (year !== getAllYears().at(-1)) return;
  const browser = await chromium.launch();
  const clip = { x: 0, y: 0, width: 1030, height: 420 };
  const page = await browser.newPage();
  await page.goto(resolve(import.meta.url, `../${year}/events.html`));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'src/static/events-screenshot.png', clip });
  await page.goto(resolve(import.meta.url, `../${year}/solver.html`));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'src/static/solver-screenshot.png', clip });
  await browser.close();
}

export async function solveAll(year, day, run = true) {
  if (day) {
    tempLeaderboard(year);
    const solver = solverFunction(year, day);
    if (solver) {
      await solver();
    } else {
      await createSolver(year, day);
    }
  } else {
    console.log(`Downloading questions (${year})...`);
    const days = getDays(year);
    var bar = new ProgressBar('[:bar] :percent', {
      total: days.length * 2 + downloadIndexTicks,
      width: 40,
    });
    await downloadIndex(year, bar, days.length * 2);
    for (const day of days) {
      await downloadQuestion(year, day, days.length * 2);
      bar.tick();
      await downloadInput(year, day);
      bar.tick();
    }
    await takeScreenshots(year);

    if (run) {
      for (const day of days) {
        const solver = solverFunction(year, day);
        await solver();
      }
    }
  }
}

export async function solveAllYears() {
  const years = getAllYears();
  for (const year of years) {
    await solveAll(year, undefined, false);
  }
}
