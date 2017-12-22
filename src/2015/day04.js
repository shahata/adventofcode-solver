const md5 = require('../utils/md5');

function solve(input, prefix) {
  let result = 1;
  while (!md5(input + result).startsWith(prefix)) {
    result++;
  }
  return result;
}

/* eslint no-bitwise: "off" */
const part1 = input => solve(input, '00000');
const part2 = input => solve(input, '000000');

module.exports = {part1, part2};
