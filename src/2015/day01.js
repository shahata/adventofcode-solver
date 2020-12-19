const parse = input => input.split('').map(x => (x === '(' ? 1 : -1));

export const part1 = input => parse(input).reduce((sum, x) => sum + x);

export const part2 = input =>
  parse(input).reduce(
    (state, x, index) => ({
      sum: state.sum + x,
      marker: state.marker || (state.sum + x === -1 ? index + 1 : undefined),
    }),
    { sum: 0, marker: undefined },
  ).marker;
