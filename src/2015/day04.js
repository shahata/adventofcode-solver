const log = require('single-line-log').stdout;
const md5 = require('md5');

function solve(input, prefix) {
  let result = 1;
  while (!md5(input + result).startsWith(prefix)) {
    result++;
  }
  return result;
}

const part1 = input => solve(input, '00000');
const part2 = input => solve(input, '000000');

function day(input) {
  log('Please wait patiently for result...');
  const result = [part1(input), part2(input)];
  log('');
  return result;
}

module.exports = {day, part1, part2};
