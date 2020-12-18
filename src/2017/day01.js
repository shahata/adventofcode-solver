import { sum } from '../utils/commons.js';

export const part1 = input => {
  const results = input
    .split('')
    .map(x => +x)
    .filter((x, i, arr) => x === arr[(i + 1) % arr.length]);
  return sum(results);
};

export const part2 = input => {
  const results = input
    .split('')
    .map(x => +x)
    .filter((x, i, arr) => x === arr[(i + arr.length / 2) % arr.length]);
  return sum(results);
};
