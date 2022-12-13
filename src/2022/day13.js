function check(a, b) {
  for (let i = 0; i < a.length && i < b.length; i++) {
    if (Number.isInteger(a[i]) && Number.isInteger(b[i])) {
      if (a[i] !== b[i]) return a[i] - b[i];
    } else {
      const result = check(
        Number.isInteger(a[i]) ? [a[i]] : a[i],
        Number.isInteger(b[i]) ? [b[i]] : b[i],
      );
      if (result !== 0) return result;
    }
  }
  return a.length - b.length;
}

export function part1(input) {
  const pairs = input
    .split('\n\n')
    .map(pair => pair.split('\n').map(x => JSON.parse(x)));
  let sum = 0;
  for (let i = 0; i < pairs.length; i++) {
    if (check(...pairs[i]) < 0) sum += i + 1;
  }
  return sum;
}

export function part2(input) {
  const divider = [[[2]], [[6]]];
  const list = input
    .replaceAll('\n\n', '\n')
    .split('\n')
    .map(x => JSON.parse(x))
    .concat(divider)
    .sort((a, b) => check(a, b));
  return divider.map(x => list.indexOf(x) + 1).reduce((a, b) => a * b);
}
