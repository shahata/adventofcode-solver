export function part1(input) {
  return input
    .split("")
    .map(Number)
    .filter((x, i, arr) => x === arr[(i + 1) % arr.length])
    .reduce((sum, x) => sum + x, 0);
}

export function part2(input) {
  return input
    .split("")
    .map(Number)
    .filter((x, i, arr) => x === arr[(i + arr.length / 2) % arr.length])
    .reduce((sum, x) => sum + x, 0);
}
