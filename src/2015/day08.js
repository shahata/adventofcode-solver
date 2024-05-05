export function part1(input) {
  return input
    .split('\n')
    .map(x => x.length - eval(x).length)
    .reduce((sum, x) => sum + x);
}

export function part2(input) {
  return input
    .split('\n')
    .map(x => JSON.stringify(x).length - x.length)
    .reduce((sum, x) => sum + x);
}
