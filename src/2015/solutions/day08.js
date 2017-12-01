function day(input) {
  /* eslint no-eval: "off" */
  const part1 = input.split('\n')
                     .map(x => x.length - eval(x).length)
                     .reduce((sum, x) => sum + x);

  const part2 = input.split('\n')
                     .map(x => JSON.stringify(x).length - x.length)
                     .reduce((sum, x) => sum + x);

  return [part1, part2];
}

module.exports = {day};
