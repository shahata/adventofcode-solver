const log = require('single-line-log').stdout;
const md5 = require('md5');

function solve(input, validator) {
  let result = 1;
  while (!validator(md5(input + result, {encoding: 'binary', asBytes: true}))) {
    result++;
  }
  return result;
}

/* eslint no-bitwise: "off" */
const part1 = input => solve(input, x => x[0] === 0 && x[1] === 0 && x[2] >> 4 === 0);
const part2 = input => solve(input, x => x[0] === 0 && x[1] === 0 && x[2] === 0);

function day(input) {
  log('Please wait patiently for result...');
  const result = [part1(input), part2(input)];
  log('');
  return result;
}

module.exports = {day, part1, part2};
