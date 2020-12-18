import { lines } from '../utils/commons.js';

function parse(input) {
  return lines(input).map(line => {
    const [depth, range] = line.split(': ').map(x => +x);
    return { depth, range };
  });
}

function severity(scanners, t = 0) {
  return scanners.reduce((total, scanner) => {
    if ((t + scanner.depth) % (scanner.range + scanner.range - 2) === 0) {
      return Math.max(0, total) + scanner.depth * scanner.range;
    } else {
      return total;
    }
  }, -1);
}

function solve(scanners) {
  let i = 0;
  while (severity(scanners, i) !== -1) {
    i++;
  }
  return i;
}

export const part1 = input => severity(parse(input));
export const part2 = input => solve(parse(input));
