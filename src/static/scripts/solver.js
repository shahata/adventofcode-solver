/* global performance, fetch */
import { dayName } from '../../utils/day-name.js';

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
  if (result.status !== 200) {
    throw `Could not download input!\n${await result.text()}`;
  }
  return (await result.text()).trimRight();
}

async function solver(year, day, session) {
  const fileName = `${year}/${dayName(day)}`;
  const url = `https://github.com/shahata/adventofcode-solver/blob/master/src/${fileName}.js`;
  console.log(
    `<a href="${url}" target="_blank">Solution for ${fileName}!!!</a>`,
  );
  console.log('----------------------------');
  const module = await import(`../../${fileName}.js`);
  const input = await readInput(
    `https://www.wix.com/_serverless/adventofcode/input/${year}/${day}?session=${session}`,
  );
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
}

export async function solveAll(year, session) {
  const days = new Array(25).fill().map((x, i) => `${i + 1}`);
  for (const day of days) {
    try {
      await solver(year, day, session);
    } catch (e) {
      console.log(e);
      console.log('');
    }
  }
}
