import { lines } from '../utils/commons.js';

function validTriangle(sides) {
  return (
    sides[0] + sides[1] > sides[2] &&
    sides[0] + sides[2] > sides[1] &&
    sides[1] + sides[2] > sides[0]
  );
}

function rotate(sides, index, lines) {
  return [
    lines[index + -1 * (index % 3)][index % 3],
    lines[index + 1 + -1 * (index % 3)][index % 3],
    lines[index + 2 + -1 * (index % 3)][index % 3],
  ];
}

function parse(input) {
  return lines(input).map(x => {
    return x
      .replace(/^\s*/, '')
      .split(/\s+/)
      .map(x => +x);
  });
}

export const part1 = input => parse(input).filter(validTriangle).length;
export const part2 = input =>
  parse(input).map(rotate).filter(validTriangle).length;
