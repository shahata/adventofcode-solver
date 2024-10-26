export function part1(input) {
  return input
    .split("\n")
    .map(Number)
    .filter((x, i, a) => i > 0 && x > a[i - 1]).length;
}

export function part2(input) {
  return input
    .split("\n")
    .map(Number)
    .filter((x, i, a) => i > 2 && x > a[i - 3]).length;
}
