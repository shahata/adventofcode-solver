function parse(input) {
  return input.split('').map(x => (x === '(' ? 1 : -1));
}

export function part1(input) {
  return parse(input).reduce((sum, x) => sum + x);
}

export function part2(input) {
  return parse(input).reduce(
    (state, x, index) => ({
      sum: state.sum + x,
      marker: state.marker || (state.sum + x === -1 ? index + 1 : undefined),
    }),
    { sum: 0, marker: undefined },
  ).marker;
}
