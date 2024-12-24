function parse(input) {
  return input.split("\n").map(x => {
    let matches = x.match(
      /^Disc #(\d+) has (\d+) positions; at time=0, it is at position (\d+)\./,
    );
    let [, index, positions, initial] = matches.map(Number);
    return { index, positions, initial };
  });
}

function solve(discs) {
  let biggest = discs.slice(0).sort().shift();
  let time = biggest.positions - biggest.initial - biggest.index;
  let fit = disc => (time + disc.initial + disc.index) % disc.positions !== 0;
  while (discs.some(fit)) {
    time += biggest.positions;
  }
  return time;
}

export function part1(input) {
  return solve(parse(input));
}

export function part2(input) {
  let discs = parse(input);
  return solve(
    discs.concat([{ index: discs.length + 1, positions: 11, initial: 0 }]),
  );
}
