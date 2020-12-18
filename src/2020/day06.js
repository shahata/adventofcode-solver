import { lines, sum } from '../utils/commons.js';

export function part1(input) {
  const results = input
    .split('\n\n')
    .map(x => new Set(x.replace(/\n/g, '').split('')).size);
  return sum(results);
}

export function part2(input) {
  const results = input.split('\n\n').map(x => {
    const merged = x.replace(/\n/g, '').split('').sort().join('');
    const count = lines(x).length;
    return merged.match(new RegExp(`(.)\\1{${count - 1}}`, 'g'))?.length || 0;
  });
  return sum(results);
}
