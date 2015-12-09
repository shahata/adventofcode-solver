/* global console */
'use strict';

import md5 from 'md5';

export function day4(input) {
  for (var part1 = 1; !md5(input + part1).startsWith('00000'); part1++);
  console.log(`Part1: ${part1}`);

  console.log('Please wait patiently for part 2 result...');
  for (var part2 = 1; !md5(input + part2).startsWith('000000'); part2++);
  console.log(`Part2: ${part2}`);
}
