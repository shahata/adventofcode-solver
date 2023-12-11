export function part1(input, add = 1) {
  const map = input.split('\n').map(line => line.split(''));
  let stars = map
    .flatMap((row, y) => row.map((cell, x) => ({ cell, x, y })))
    .filter(({ cell }) => cell === '#');
  let ydiff = 0;
  for (let y = 0; y < map.length; y++) {
    if (map[y].every(c => c === '.')) {
      stars = stars.map(c => ({ ...c, y: c.y > y + ydiff ? c.y + add : c.y }));
      ydiff += add;
    }
  }
  let xdiff = 0;
  for (let x = 0; x < map[0].length; x++) {
    if (map.every(row => row[x] === '.')) {
      stars = stars.map(c => ({ ...c, x: c.x > x + xdiff ? c.x + add : c.x }));
      xdiff += add;
    }
  }
  const distances = stars.map((a, i) =>
    stars
      .slice(i + 1)
      .reduce((acc, b) => acc + Math.abs(a.x - b.x) + Math.abs(a.y - b.y), 0),
  );
  return distances.reduce((a, b) => a + b);
}

export function part2(input) {
  return part1(input, 999999);
}
