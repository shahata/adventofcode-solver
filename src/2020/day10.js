export function part1(input) {
  const numbers = input
    .split('\n')
    .map(x => +x)
    .concat(0)
    .sort((a, b) => a - b);
  const map = new Map([
    [1, 0],
    [2, 0],
    [3, 1],
  ]);
  for (let i = 1; i < numbers.length; i++) {
    const diff = numbers[i] - numbers[i - 1];
    map.set(diff, map.get(diff) + 1);
  }
  return map.get(1) * map.get(3);
}

export function part2(input) {
  const numbers = input
    .split('\n')
    .map(x => +x)
    .concat(0)
    .sort((a, b) => a - b);
  const map = new Map([[0, 1]]);
  for (let i = 1; i < numbers.length; i++) {
    const ways =
      (map.get(numbers[i] - 1) || 0) +
      (map.get(numbers[i] - 2) || 0) +
      (map.get(numbers[i] - 3) || 0);
    map.set(numbers[i], ways);
  }
  return map.get(numbers.pop());
}
