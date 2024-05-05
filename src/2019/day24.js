function getBugs(life, x, y) {
  return [
    life[y - 1] && life[y - 1][x],
    life[y + 1] && life[y + 1][x],
    life[y][x - 1],
    life[y][x + 1],
  ].filter(x => x === '#').length;
}

function getBugs2(lifez, x, y, z) {
  const up = lifez[z - 1];
  const down = lifez[z + 1];
  const result = [];
  if (x === 2 && y === 2) return 0;
  if (up) {
    if (x === 0) result.push(up[2][1]);
    if (y === 0) result.push(up[1][2]);
    if (x === 4) result.push(up[2][3]);
    if (y === 4) result.push(up[3][2]);
  }
  if (down) {
    if (x == 2 && y === 1) result.push(...down[0]);
    if (x == 2 && y === 3) result.push(...down[4]);
    if (y == 2 && x === 1) result.push(...down.map(l => l[0]));
    if (y == 2 && x === 3) result.push(...down.map(l => l[4]));
  }
  return result.filter(x => x === '#').length + getBugs(lifez[z], x, y);
}

function calc(c, bugs) {
  if (c === '#') {
    if (bugs !== 1) return '.';
  } else {
    if (bugs === 1 || bugs === 2) return '#';
  }
  return c;
}

export function part1(input) {
  let life = input.split('\n').map(line => line.split(''));
  const memo = new Set();

  while (!memo.has(life.map(line => line.join('')).join(''))) {
    memo.add(life.map(line => line.join('')).join(''));
    life = life.map((line, y) =>
      line.map((c, x) => calc(c, getBugs(life, x, y))),
    );
  }

  const chars = life.reduce((prev, line) => prev.concat(line), []);
  const ratings = chars.map((x, i) => (x === '.' ? 0 : 2 ** i));
  return ratings.reduce((a, b) => a + b);
}

export function part2(input, minutes = 200) {
  const level = input.split('\n').map(line => line.split(''));
  let lifez = new Array(Math.ceil(minutes * 2.5)).fill().map(() => {
    return new Array(5).fill().map(() => new Array(5).fill('.'));
  });
  lifez[Math.ceil(minutes * 1.25)] = level;

  for (let i = 0; i < minutes; i++) {
    lifez = lifez.map((life, z) =>
      life.map((line, y) =>
        line.map((c, x) => calc(c, getBugs2(lifez, x, y, z))),
      ),
    );
  }

  const lines = lifez.reduce((prev, life) => prev.concat(life), []);
  const chars = lines.reduce((prev, line) => prev.concat(line), []);
  return chars.filter(c => c === '#').length;
}
