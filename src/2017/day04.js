export const part1 = input =>
  input.split('\n').filter(x => {
    const words = x.split(/\s+/).sort();
    return (
      words.length === words.filter((x, i, arr) => x !== arr[i + 1]).length
    );
  }).length;

export const part2 = input =>
  input.split('\n').filter(x => {
    const words = x
      .split(/\s+/)
      .map(x => x.split('').sort().join(''))
      .sort();
    return (
      words.length === words.filter((x, i, arr) => x !== arr[i + 1]).length
    );
  }).length;
