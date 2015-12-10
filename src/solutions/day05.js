'use strict';

export function day5(input) {
  let part1 = input.split('\n')
                   .filter(x => (x.match(/[aeiou]/g) || []).length >= 3)
                   .filter(x => x.match(/([a-z])\1/))
                   .filter(x => !x.match(/ab|cd|pq|xy/))
                   .length;

  let part2 = input.split('\n')
                   .filter(x => x.match(/([a-z][a-z]).*\1/))
                   .filter(x => x.match(/([a-z]).\1/))
                   .length;

  return [part1, part2];
}
