'use strict';

function validTriangle(sides) {
  return sides[0] + sides[1] > sides[2] &&
         sides[0] + sides[2] > sides[1] &&
         sides[1] + sides[2] > sides[0];
}

function rotate(sides, index, lines) {
  return [
    lines[index + (-1 * (index % 3))][index % 3],
    lines[index + 1 + (-1 * (index % 3))][index % 3],
    lines[index + 2 + (-1 * (index % 3))][index % 3]
  ];
}

function day(input) {
  const parsed = input.split('\n')
                     .map(x => x.replace(/^\s*/, '')
                                .split(/\s+/)
                                .map(x => parseInt(x, 10)));
  const part1 = parsed.filter(validTriangle).length;
  const part2 = parsed.map(rotate).filter(validTriangle).length;
  return [part1, part2];
}

module.exports = {day};
