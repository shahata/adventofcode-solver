import { lines, sum } from '../utils/commons.js';

export const part1 = input => {
  const results = lines(input).map(x => x.length - eval(x).length);
  return sum(results);
};

export const part2 = input => {
  const results = lines(input).map(x => JSON.stringify(x).length - x.length);
  return sum(results);
};
