export function part1(input, top = 1) {
  const elves = input
    .split('\n\n')
    .map(x =>
      x
        .split('\n')
        .map(x => +x)
        .reduce((a, b) => a + b),
    )
    .sort((a, b) => b - a);
  return elves.slice(0, top).reduce((a, b) => a + b);
}

export function part2(input) {
  return part1(input, 3);
}
