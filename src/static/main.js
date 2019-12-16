/* global document, performance, PerformanceObserver, fetch */
import { dayName } from '../utils/day-name.js';

console.log = str => {
  document.getElementById('output').innerText += str + '\n';
};

let timerifyCounter = 0;
performance.timerify = fn => {
  return (...args) => {
    timerifyCounter++;
    performance.mark(`timerify-${timerifyCounter}-start`);
    const result = fn(...args);
    performance.mark(`timerify-${timerifyCounter}-end`);
    performance.measure(
      `timerify-${timerifyCounter}`,
      `timerify-${timerifyCounter}-start`,
      `timerify-${timerifyCounter}-end`,
    );
    return result;
  };
};

let duration;
const obs = new PerformanceObserver(list => {
  duration = `(${Math.round(list.getEntries().shift().duration)}ms)`;
});
obs.observe({ entryTypes: ['measure'] });

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

export async function solveAll(year) {
  const days = getDays();
  for (const day of days) {
    const solver = solverFunction(year, day);
    await solver();
  }
}
