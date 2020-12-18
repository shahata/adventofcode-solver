import { lines } from '../utils/commons.js';

export function part1(input) {
  return lines(input).reduce((prev, x) => prev + +x, 0);
}

export function part2(input) {
  const numbers = lines(input).map(x => +x);
  const visited = new Set();
  let current = 0;
  let frequency = 0;
  while (!visited.has(frequency)) {
    visited.add(frequency);
    frequency += numbers[current % numbers.length];
    current++;
  }
  return frequency;
}
