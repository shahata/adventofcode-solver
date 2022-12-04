export function part1(input) {
  let count = 0;
  const pairs = input
    .split('\n')
    .map(pair => pair.split(',').map(x => x.split('-').map(x => +x)));
  for (const pair of pairs) {
    const [a, b] = pair;
    if (a[0] >= b[0] && a[1] <= b[1]) {
      count++;
    } else if (b[0] >= a[0] && b[1] <= a[1]) {
      count++;
    }
  }
  return count;
}

export function part2(input) {
  let count = 0;
  const pairs = input
    .split('\n')
    .map(pair => pair.split(',').map(x => x.split('-').map(x => +x)));
  for (const pair of pairs) {
    const [a, b] = pair;
    if (a[0] >= b[0] && a[0] <= b[1]) {
      count++;
    } else if (b[0] >= a[0] && b[0] <= a[1]) {
      count++;
    }
  }
  return count;
}
