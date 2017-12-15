const log = require('single-line-log').stdout;

function solve1(elves) {
  while (elves.length > 1) {
    const length = elves.length;
    elves = elves.filter((x, i) => i % 2 === 0);
    if (length % 2 === 1) {
      elves.shift();
    }
  }
  return elves.shift();
}

function solve2(elves) {
  const originalLength = elves.length;
  let next = 0;
  while (elves.length > 1) {
    const from = (next + Math.floor(elves.length / 2)) % elves.length;
    elves.splice(from, 1);
    if (from < next) {
      next--;
    }
    next = (next + 1) % elves.length;
    log(`${Math.round(10000 * (originalLength - elves.length) / originalLength) / 100}%`);
  }
  log('');
  return elves.shift();
}

function elves(input) {
  const count = parseInt(input, 10);
  return new Array(count).fill().map((x, i) => i + 1);
}

const part1 = input => solve1(elves(input));
const part2 = input => solve2(elves(input));
const day = input => [part1(input), part2(input)];

module.exports = {day, part1, part2};
