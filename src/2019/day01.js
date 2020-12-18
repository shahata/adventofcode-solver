import { lines, sum } from '../utils/commons.js';

export function part1(input) {
  const results = lines(input).map(x => Math.floor(+x / 3) - 2);
  return sum(results);
}

export function part2(input) {
  const results = lines(input).map(x => {
    let fuel = Math.floor(+x / 3) - 2;
    let extra = fuel;
    while (extra > 0) {
      extra = Math.max(Math.floor(extra / 3) - 2, 0);
      fuel += extra;
    }
    return fuel;
  });
  return sum(results);
}
