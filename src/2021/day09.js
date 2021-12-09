const neighbors = (map, point) =>
  [
    map[point.i - 1] && map[point.i - 1][point.j + 0],
    map[point.i + 1] && map[point.i + 1][point.j + 0],
    map[point.i + 0] && map[point.i + 0][point.j - 1],
    map[point.i + 0] && map[point.i + 0][point.j + 1],
  ].filter(x => x !== undefined);

function markBasin(map, point) {
  if (point.basin || point.val === 9) {
    return 0;
  } else {
    point.basin = true;
    const sizes = neighbors(map, point).map(p => markBasin(map, p));
    return sizes.reduce((a, b) => a + b) + 1;
  }
}

function findBasins(input) {
  const basins = [];
  const map = input
    .split('\n')
    .map((line, i) => line.split('').map((x, j) => ({ val: +x, i, j })));
  for (const line of map) {
    for (const point of line) {
      if (neighbors(map, point).every(x => x.val > point.val)) {
        basins.push({ risk: point.val + 1, size: markBasin(map, point) });
      }
    }
  }
  return basins.sort((a, b) => b.size - a.size);
}

export function part1(input) {
  return findBasins(input).reduce((prev, x) => prev + x.risk, 0);
}

export function part2(input) {
  return findBasins(input)
    .slice(0, 3)
    .reduce((prev, x) => prev * x.size, 1);
}
