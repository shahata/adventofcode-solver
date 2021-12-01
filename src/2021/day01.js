export function part1(input) {
  return input
    .split('\n')
    .map(x => +x)
    .filter((x, i, a) => i > 0 && a[i - 1] < x).length;
}

export function part2(input) {
  return input
    .split('\n')
    .map(x => +x)
    .filter(
      (x, i, a) =>
        i > 2 && a[i - 1] + a[i - 2] + a[i - 3] < x + a[i - 1] + a[i - 2],
    ).length;
}
