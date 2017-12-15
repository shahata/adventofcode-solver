function day(input) {
  const part1 = input.split('')
                     .map(x => x === '(' ? 1 : -1)
                     .reduce((sum, x) => sum + x);

  const part2 = input.split('')
                     .map(x => x === '(' ? 1 : -1)
                     .reduce((state, x, index) => ({
                       sum: state.sum + x,
                       marker: state.marker || (state.sum + x === -1 ? index + 1 : undefined)
                     }), {sum: 0, marker: undefined}).marker;

  return [part1, part2];
}

module.exports = {day};
