export function part1(input) {
  let sea = input
    .split('\n')
    .map((line, y) => line.split('').map((c, x) => ({ c, x, y })));
  let next, i;
  for (i = 0; JSON.stringify(sea) !== JSON.stringify(next); i++) {
    sea = next || sea;
    next = sea.map(line => line.map(({ x, y }) => ({ c: '.', x, y })));
    sea.flat().forEach(({ c, x, y }) => {
      if (c === '>') {
        const n = x + 1 === sea[0].length ? 0 : x + 1;
        if (sea[y][n].c === '.') {
          next[y][n] = { c, x: n, y };
        } else {
          next[y][x] = { c, x, y };
        }
      }
    });
    sea.flat().forEach(({ c, x, y }) => {
      if (c === 'v') {
        let n = y + 1 === sea.length ? 0 : y + 1;
        if (sea[n][x].c !== 'v' && next[n][x].c === '.') {
          next[n][x] = { c, x, y: n };
        } else {
          next[y][x] = { c, x, y };
        }
      }
    });
  }
  return i;
}

export const part2 = () => undefined;
