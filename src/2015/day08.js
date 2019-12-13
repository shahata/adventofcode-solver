export const part1 = input =>
  input
    .split('\n')
    .map(x => x.length - eval(x).length)
    .reduce((sum, x) => sum + x);

export const part2 = input =>
  input
    .split('\n')
    .map(x => JSON.stringify(x).length - x.length)
    .reduce((sum, x) => sum + x);
