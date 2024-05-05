import md5 from '../utils/md5.js';

function solve(input, prefix) {
  let result = 1;
  while (!md5(input + result).startsWith(prefix)) {
    result++;
  }
  return result;
}

export function part1(input) {
  return solve(input, '00000');
}

export function part2(input) {
  return solve(input, '000000');
}
