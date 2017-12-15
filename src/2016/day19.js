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

function day(input) {
  const count = parseInt(input, 10);
  const elves = new Array(count).fill().map((x, i) => i + 1);
  const part1 = solve1(elves);
  const part2 = solve2(elves);
  return [part1, part2];
}

module.exports = {day};
