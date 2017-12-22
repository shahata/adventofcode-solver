const log = require('single-line-log').stdout;

function next(x, factor, validator) {
  do {
    x = (x * factor) % 2147483647;
  } while (x % validator !== 0);
  return x;
}

function judge(a, b, validators, times) {
  let count = 0;
  for (let i = 0; i < times; i++) {
    a = next(a, 16807, validators[0]);
    b = next(b, 48271, validators[1]);
    if (a % 65536 === b % 65536) {
      count++;
      log(`${Math.floor(100 * i / times)}%`);
    }
  }
  log('');
  return count;
}

function parse(input) {
  return input.split('\n').map(x => parseInt(x.match(/\d+$/).pop(), 10));
}

const part1 = (input, times = 40 * 1000 * 1000) => judge(...parse(input), [1, 1], times);
const part2 = (input, times = 5 * 1000 * 1000) => judge(...parse(input), [4, 8], times);
const day = input => [part1(input), part2(input)];

module.exports = {day, part1, part2};
