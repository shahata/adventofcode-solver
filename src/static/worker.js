/* global performance, fetch, self */
import { dayName } from '../utils/day-name.js';

console.log = (...args) => {
  const str = args.map(x => `${x}`).join(' ');
  self.postMessage(str + '\n');
};

let duration;
performance.timerify = fn => {
  return (...args) => {
    const t0 = performance.now();
    const result = fn(...args);
    const t1 = performance.now();
    duration = `(${Math.round(t1 - t0)}ms)`;
    return result;
  };
};

async function readInput(url) {
  const result = await fetch(url);
  return (await result.text()).trimRight();
}

function solverFunction(year, day) {
  return async () => {
    const module = await import(`../${year}/${dayName(day)}.js`);
    const input = await readInput(`../${year}/${dayName(day)}.txt`);

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

function getDays() {
  return new Array(25).fill().map((x, i) => `${i + 1}`);
}

async function solveAll(year) {
  const days = getDays();
  for (const day of days) {
    try {
      const solver = solverFunction(year, day);
      await solver();
    } catch (e) {
      console.log(`Exception in ${year}/${dayName(day)}!!!`);
      console.log('----------------------------');
      console.log(e);
      console.log('');
    }
  }
}

self.onmessage = e => {
  solveAll(e.data.year);
};
