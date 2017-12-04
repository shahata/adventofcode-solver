// root@ebhq-gridcenter# df -h
// Filesystem              Size  Used  Avail  Use%
// /dev/grid/node-x0-y0     92T   72T    20T   78%
// /dev/grid/node-x0-y1     88T   67T    21T   76%
// /dev/grid/node-x0-y2     89T   67T    22T   75%
// /dev/grid/node-x0-y3     90T   68T    22T   75%
const Combinatorics = require('js-combinatorics');

function day(input) {
  const nodes = input.split('\n').slice(2).map(x => {
    const fix = x => parseInt(x.replace(/.$/, ''), 10);
    const [name, size, used, avail, use] = x.split(/\s+/);
    return {name, size: fix(size), used: fix(used), avail: fix(avail), use};
  });
  const combinations = Combinatorics.bigCombination(nodes, 2).toArray();
  const pairs = combinations.concat(combinations.map(x => [x[1], x[0]])).filter(x => {
    return x[0].used !== 0 && x[0].used <= x[1].avail;
  });
  const part1 = pairs.length;
  const part2 = input;
  return [part1, part2];
}

module.exports = {day};
