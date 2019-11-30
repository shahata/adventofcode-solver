import md5 from '../utils/md5.js';

function solve(input, prefix) {
  let result = 1;
  while (!md5(input + result).startsWith(prefix)) {
    result++;
  }
  return result;
}

/* eslint no-bitwise: "off" */
export const part1 = input => solve(input, '00000');
export const part2 = input => solve(input, '000000');
