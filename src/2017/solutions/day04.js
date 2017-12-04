function day(input) {
  const part1 = input.split('\n').filter(x => {
    const words = x.split(/\s+/).sort();
    return words.length === words.filter((x, i, arr) => x !== arr[i + 1]).length;
  }).length;

  const part2 = input.split('\n').filter(x => {
    const words = x.split(/\s+/).map(x => x.split('').sort().join('')).sort();
    return words.length === words.filter((x, i, arr) => x !== arr[i + 1]).length;
  }).length;

  return [part1, part2];
}

module.exports = {day};
