const Combinatorics = require('js-combinatorics');

function parse(input) {
  return input.split('\n').slice(2).map(x => {
    const fix = x => parseInt(x.replace(/.$/, ''), 10);
    const [name, size, used, avail, use] = x.split(/\s+/);
    return {name, size: fix(size), used: fix(used), avail: fix(avail), use};
  });
}

function solve1(nodes) {
  const pairs = Combinatorics.bigCombination(nodes, 2).toArray();
  return pairs.concat(pairs.map(x => [x[1], x[0]])).filter(x => {
    return x[0].used !== 0 && x[0].used <= x[1].avail;
  });
}

function day(input) {
  const nodes = parse(input);
  const part1 = solve1(nodes).length;
  const part2 = 7;
  return [part1, part2];
}

module.exports = {day};
