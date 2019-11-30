import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { performance, PerformanceObserver } from 'perf_hooks';

import { dayName } from './day-name.js';
import { getDayInput } from './scraper.js';
import { downloadQuestion, downloadIndex, createSolver } from './renderer.js';

let duration;
const obs = new PerformanceObserver(list => {
  duration = `(${Math.round(list.getEntries().shift().duration)}ms)`;
});
obs.observe({ entryTypes: ['function'] });

function solverFunction(year, day) {
  return async () => {
    const module = await import(`../${year}/${dayName(day)}.js`);
    const input = (await getDayInput(year, day)).trimRight();
    await downloadQuestion(year, day);
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

function getSolvers(year) {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return fs
      .readdirSync(path.resolve(__dirname, '..', year))
      .filter(x => x.match(/^day\d+\.js$/))
      .map(x => solverFunction(year, `${parseInt(x.match(/\d+/).shift())}`));
  } catch (e) {
    console.error(`must pass valid year in first argument`);
    process.exit(0);
  }
}

export default async function solveAll(year, day) {
  if (day) {
    const solver = solverFunction(year, day);
    if (solver) {
      await solver();
    } else {
      await createSolver(year, day);
    }
  } else {
    const solvers = getSolvers(year, day);
    await downloadIndex(year);
    for (const solver of solvers) {
      await solver();
    }
  }
}
