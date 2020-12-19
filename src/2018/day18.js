function transform(yard, x, y) {
  const current = yard[y][x];
  const neighbors = [
    yard[y - 1] && yard[y - 1][x - 1],
    yard[y - 1] && yard[y - 1][x + 0],
    yard[y - 1] && yard[y - 1][x + 1],
    yard[y + 0] && yard[y + 0][x - 1],
    yard[y + 0] && yard[y + 0][x + 1],
    yard[y + 1] && yard[y + 1][x - 1],
    yard[y + 1] && yard[y + 1][x + 0],
    yard[y + 1] && yard[y + 1][x + 1],
  ];
  const total = cell => neighbors.filter(x => x === cell).length;
  if (current === '.' && total('|') >= 3) {
    return '|';
  } else if (current === '|' && total('#') >= 3) {
    return '#';
  } else if (current === '#' && (total('#') === 0 || total('|') === 0)) {
    return '.';
  } else {
    return current;
  }
}

const memo = {};
function next(yard, minute) {
  const hash = yard.map(x => x.join('')).join('\n');
  if (!memo[hash]) {
    const result = yard.map((line, y) =>
      line.map((cell, x) => transform(yard, x, y)),
    );
    memo[hash] = { result, minute };
  }
  return memo[hash];
}

export function part1(input, minutes = 10) {
  let yard = input.split('\n').map(x => x.split(''));
  for (let i = 0; i < minutes; i++) {
    const { result, minute } = next(yard, i);
    const diff = i - minute;
    yard = result;
    if (diff > 0) {
      i += diff * Math.floor((minutes - i - 1) / diff);
    }
  }
  const total = yard.reduce(
    (sum, line) => ({
      trees: sum.trees + line.filter(x => x === '|').length,
      lumberyards: sum.lumberyards + line.filter(x => x === '#').length,
    }),
    { trees: 0, lumberyards: 0 },
  );
  return total.trees * total.lumberyards;
}

export function part2(input) {
  return part1(input, 1000000000);
}
