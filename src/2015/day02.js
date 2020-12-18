import { lines } from '../utils/commons.js';

const parse = input => lines(input).map(x => x.split('x').map(x => +x));

export const part1 = input =>
  parse(input)
    .map(x => [x[0] * x[1], x[1] * x[2], x[0] * x[2]])
    .map(x => 2 * (x[0] + x[1] + x[2]) + Math.min(...x))
    .reduce((prev, item) => prev + item);

export const part2 = input =>
  parse(input)
    .map(x => 2 * (x[0] + x[1] + x[2] - Math.max(...x)) + x[0] * x[1] * x[2])
    .reduce((prev, item) => prev + item);
