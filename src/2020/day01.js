import Combinatorics from 'js-combinatorics';

export function part1(input) {
  const items = input.split('\n').map(x => parseInt(x));
  const result = Combinatorics.bigCombination(items, 2).find(
    x => x[0] + x[1] === 2020,
  );
  return result[0] * result[1];
}

export function part2(input) {
  const items = input.split('\n').map(x => parseInt(x));
  const result = Combinatorics.bigCombination(items, 3).find(
    x => x[0] + x[1] + x[2] === 2020,
  );
  return result[0] * result[1] * result[2];
}
