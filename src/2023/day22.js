function parse(input) {
  const bricks = input.split('\n').map(line => {
    const [a, b] = line.split('~').map(x => x.split(',').map(y => +y));
    const body = [];
    for (let x = a[0]; x <= b[0]; x++) {
      for (let y = a[1]; y <= b[1]; y++) {
        for (let z = a[2]; z <= b[2]; z++) {
          body.push([x, y, z]);
        }
      }
    }
    return body;
  });
  return bricks.sort(
    (a, b) => Math.min(...a.map(x => x[2])) - Math.min(...b.map(x => x[2])),
  );
}

function index(bricks) {
  const map = new Map();
  for (let brick of bricks) {
    brick.forEach(b => {
      const key = `${b[0]},${b[1]}`;
      map.set(key, (map.get(key) || []).concat({ brick, b }));
      map.set(b.join(','), bricks.indexOf(brick));
    });
  }
  return map;
}

function fall(bricks) {
  let change = true;
  const map = index(bricks);
  while (change) {
    change = false;
    for (let brick of bricks) {
      const distances = brick.map(b => {
        const under = map
          .get(`${b[0]},${b[1]}`)
          .filter(o => o.brick !== brick && o.b[2] < b[2]);
        return b[2] - Math.max(...under.map(o => o.b[2]), 0) - 1;
      });
      const drop = Math.min(...distances);
      if (drop > 0) {
        brick.forEach(b => (b[2] -= drop));
        change = true;
      }
    }
  }
}

export function part1(input) {
  const bricks = parse(input);
  fall(bricks);

  const map = index(bricks);
  const important = new Set();
  for (let i = 0; i < bricks.length; i++) {
    const support = new Set();
    bricks[i].forEach(b => {
      const under = map.get(`${b[0]},${b[1]},${b[2] - 1}`);
      if (under !== undefined && under !== i) support.add(under);
    });
    if (support.size === 1) support.forEach(x => important.add(x));
  }
  return bricks.length - important.size;
}

export function part2(input) {
  const bricks = parse(input);
  fall(bricks);

  let moved = 0;
  for (let brick of bricks) {
    const test = JSON.parse(JSON.stringify(bricks.filter(b => b !== brick)));
    const before = test.map(brick => brick.reduce((a, b) => a + b[2], 0));
    fall(test);
    const after = test.map(brick => brick.reduce((a, b) => a + b[2], 0));
    for (let i = 0; i < before.length; i++) if (before[i] !== after[i]) moved++;
  }
  return moved;
}
