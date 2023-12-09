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
function timerify(fn) {
  const start = performance.now();
  const result = fn();
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
      const { part1, part2 } = timerify(() => module.day(input));
      console.log(`Part1: ${part1}`);
      console.log(`Part2: ${part2}`, duration);
    } else {
      console.log(`Part1: ${timerify(() => module.part1(input))}`, duration);
      console.log(`Part2: ${timerify(() => module.part2(input))}`, duration);
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

async function takeScreenshots() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(resolve(import.meta.url, '../2023/events.html'));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: 'src/static/events-screenshot.png',
    clip: { x: 0, y: 0, width: 1030, height: 420 },
  });
  await page.goto(resolve(import.meta.url, '../2023/solver.html'));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: 'src/static/solver-screenshot.png',
    clip: { x: 0, y: 0, width: 1030, height: 420 },
  });
  await browser.close();
}

export default async function solveAll(year, day, run = true) {
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
    await takeScreenshots();
    console.log('');

    if (run) {
      for (const day of days) {
        const solver = solverFunction(year, day);
        await solver();
      }
    }
  }
}
