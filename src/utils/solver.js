import fs from 'fs';
import url from 'url';
import path from 'path';
import ProgressBar from 'progress';
import { performance, PerformanceObserver } from 'perf_hooks';

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
const obs = new PerformanceObserver(list => {
  duration = `(${Math.round(list.getEntries().shift().duration)}ms)`;
});
obs.observe({ entryTypes: ['function'] });

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

function solverFunction(year, day) {
  const solver = path.resolve(__dirname, '..', year, `${dayName(day)}.js`);
  if (!fs.existsSync(solver)) {
    return undefined;
  }
  return async () => {
    const module = await import(`../${year}/${dayName(day)}.js`);
    const input = readInput(
      url.resolve(import.meta.url, `../${year}/${dayName(day)}.js`),
    );
    console.log(`Solution for ${year}/${dayName(day)}!!!`);
    console.log('----------------------------');
    if (module.day) {
      const { part1, part2 } = performance.timerify(module.day)(input);
      console.log(`Part1: ${part1}`);
      console.log(`Part2: ${part2}`, duration);
    } else {
      console.log(
        `Part1: ${performance.timerify(module.part1)(input)}`,
        duration,
      );
      console.log(
        `Part2: ${performance.timerify(module.part2)(input)}`,
        duration,
      );
    }
    console.log('');
  };
}

function getDays(year) {
  try {
    return fs
      .readdirSync(path.resolve(__dirname, '..', year))
      .filter(x => x.match(/^day\d+\.js$/))
      .map(x => `${parseInt(x.match(/\d+/).shift())}`);
  } catch (e) {
    console.error(`must pass valid year in first argument`);
    process.exit(0);
  }
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
    await downloadIndex(year, bar);
    for (const day of days) {
      await downloadQuestion(year, day);
      bar.tick();
      await downloadInput(year, day);
      bar.tick();
    }
    console.log('');

    if (run) {
      for (const day of days) {
        const solver = solverFunction(year, day);
        await solver();
      }
    }
  }
}
