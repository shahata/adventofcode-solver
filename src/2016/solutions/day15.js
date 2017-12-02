function parse(input) {
  return input.split('\n').map(x => {
    const matches = x.match(/^Disc #(\d+) has (\d+) positions; at time=0, it is at position (\d+)\./);
    const [, index, positions, initial] = matches.map(x => parseInt(x, 10));
    return {index, positions, initial};
  });
}

function solve(discs) {
  const biggest = discs.slice(0).sort().shift();
  let time = biggest.positions - biggest.initial - biggest.index;
  const fit = disc => (time + disc.initial + disc.index) % disc.positions !== 0;
  while (discs.some(fit)) {
    time += biggest.positions;
  }
  return time;
}

function day(input) {
  const discs = parse(input);
  const part1 = solve(discs);
  const part2 = solve(discs.concat([{index: discs.length + 1, positions: 11, initial: 0}]));
  return [part1, part2];
}

module.exports = {day};
