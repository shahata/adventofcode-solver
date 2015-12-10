/* global console */
'use strict';

import md5 from 'md5';

export function day4(input) {
  let part1 = 1;
  while (!md5(input + part1).startsWith('00000')) {
    part1++;
  }
  console.log(`Part1: ${part1}`);

  let part2 = part1;
  console.log('Please wait patiently for part 2 result...');
  while (!md5(input + part2).startsWith('000000')) {
    part2++;
  }
  console.log(`Part2: ${part2}`);
}
