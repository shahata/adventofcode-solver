/* global console */
'use strict';

const md5 = require('md5');

function day(input) {
  console.log('Please wait patiently for result...');

  let part1 = 1;
  while (!md5(input + part1).startsWith('00000')) {
    part1++;
  }

  let part2 = part1;
  while (!md5(input + part2).startsWith('000000')) {
    part2++;
  }

  return [part1, part2];
}

module.exports = {day};
