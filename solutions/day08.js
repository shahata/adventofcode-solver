'use strict';

export function day8(input) {
  /* jslint evil: true */
  let part1 = input.split('\n')
                   .map(x => x.length - eval(x).length)
                   .reduce((sum, x) => sum + x, 0);

  let part2 = input.split('\n')
                   .map(x => JSON.stringify(x).length - x.length)
                   .reduce((sum, x) => sum + x, 0);

  return [part1, part2];
}
