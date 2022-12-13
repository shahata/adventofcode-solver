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
  return input
    .split('\n\n')
    .map(pair => pair.split('\n').map(x => JSON.parse(x)))
    .map((pair, i) => (check(...pair) < 0 ? i + 1 : 0))
    .reduce((a, b) => a + b);
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
