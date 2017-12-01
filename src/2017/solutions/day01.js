function day(input) {
  const part1 = input.split('')
                     .map(x => parseInt(x, 10))
                     .filter((x, i, arr) => x === arr[(i + 1) % arr.length])
                     .reduce((sum, x) => sum + x, 0);

  const part2 = input.split('')
                     .map(x => parseInt(x, 10))
                     .filter((x, i, arr) => x === arr[(i + (arr.length / 2)) % arr.length])
                     .reduce((sum, x) => sum + x, 0);

  return [part1, part2];
}

module.exports = {day};
