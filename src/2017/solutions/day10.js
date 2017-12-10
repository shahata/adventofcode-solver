function step({chain, skip, current}, length) {
  const phase1 = chain.slice(current).concat(chain.slice(0, current));
  const phase2 = phase1.slice(0, length).reverse().concat(phase1.slice(length));
  const phase3 = phase2.slice(-1 * current).concat(phase2.slice(0, -1 * current));
  const rotated = phase3;
  return {chain: rotated, skip: skip + 1, current: (current + length + skip) % chain.length};
}

function solve(chain, lengths) {
  return lengths.reduce(step, {chain, skip: 0, current: 0});
}

function parse(input) {
  return input.split(',').map(x => parseInt(x, 10));
}

function list(size) {
  return new Array(size).fill().map((x, i) => i);
}

function day(input, size = 256) {
  const part1 = solve(list(size), parse(input)).chain.slice(0, 2).reduce((a, b) => a * b);
  const part2 = input;
  return [part1, part2];
}

module.exports = {day};
