export function part1(input) {
  return input
    .split('\n')
    .map(x => Math.floor(+x / 3) - 2)
    .reduce((a, b) => a + b);
}

export function part2(input) {
  return input
    .split('\n')
    .map(x => {
      let fuel = Math.floor(+x / 3) - 2;
      let extra = fuel;
      while (extra > 0) {
        extra = Math.max(Math.floor(extra / 3) - 2, 0);
        fuel += extra;
      }
      return fuel;
    })
    .reduce((a, b) => a + b);
}
