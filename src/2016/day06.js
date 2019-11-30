function solve(input) {
  return input
    .split('\n')
    .map(x => x.split(''))
    .reduce((commons, word) => {
      return word.map((c, i) => {
        commons[i] = commons[i] || {};
        commons[i] = { ...commons[i], [c]: (commons[i][c] || 0) + 1 };
        return commons[i];
      });
    }, [])
    .map(occurrences => {
      return Object.keys(occurrences)
        .map(x => ({ letter: x, times: occurrences[x] }))
        .sort((a, b) => b.times - a.times)
        .map(x => x.letter);
    });
}

export const part1 = input =>
  solve(input)
    .map(x => x.shift())
    .join('');
export const part2 = input =>
  solve(input)
    .map(x => x.pop())
    .join('');
