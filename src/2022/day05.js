function parse(input) {
  let crates = new Array(10).fill().map(() => []);
  let [map, instructions] = input.split("\n\n");
  map = map.split("\n").map(line => line.replace(/[[\]\d]/g, " "));
  for (let line of map) {
    for (let i = 0; i < line.length; i++) {
      if (line[i] !== " ") crates[(i - 1) / 4].unshift(line[i]);
    }
  }
  instructions = instructions.split("\n").map(line => {
    let [, count, from, to] = line.match(/^move (\d+) from (\d+) to (\d+)$/);
    return { count: +count, from: from - 1, to: to - 1 };
  });
  return { crates, instructions };
}

export function part1(input, singles = true) {
  let { crates, instructions } = parse(input);
  for (let { count, from, to } of instructions) {
    let removed = crates[from].splice(crates[from].length - count);
    if (singles) removed.reverse();
    crates[to].push(...removed);
  }
  return crates.map(x => x.pop()).join("");
}

export function part2(input) {
  return part1(input, false);
}
