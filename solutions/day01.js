/* global console */
'use strict';

export function day1(input) {
  let part1 = input.split('')
                   .map(x => x === '(' ? 1 : -1)
                   .reduce((sum, x) => sum + x, 0);
  console.log(`Part1: ${part1}`);

  let part2;
  input.split('').map(x => x === '(' ? 1 : -1)
                 .reduce((sum, x, index) => {
                   if (sum === -1 && !part2) {
                     part2 = index;
                   }
                   return sum + x;
                 }, 0);
  console.log(`Part2: ${part2}`);
}
