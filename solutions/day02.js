'use strict';

export function day2(input) {
  let part1 = input.split('\n')
                   .map(x => x.split('x').map(x => parseInt(x, 10)))
                   .map(x => [x[0] * x[1], x[1] * x[2], x[0] * x[2]])
                   .map(x => 2 * (x[0] + x[1] + x[2]) + Math.min.apply(Math, x))
                   .reduce((prev, item) => prev + item, 0);

  let part2 = input.split('\n')
                   .map(x => x.split('x').map(x => parseInt(x, 10)))
                   .map(x => 2 * (x[0] + x[1] + x[2] - Math.max.apply(Math, x)) + x[0] * x[1] * x[2])
                   .reduce((prev, item) => prev + item, 0);

  return [part1, part2];
}
