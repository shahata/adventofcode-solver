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
  for (const brick of bricks) {
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
    for (const brick of bricks) {
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

function inspect(bricks) {
  const map = index(bricks);
  return bricks.map((brick, i) => {
    const set = new Set();
    brick.forEach(b => {
      const under = map.get(`${b[0]},${b[1]},${b[2] - 1}`);
      if (under !== undefined && under !== i) set.add(under);
    });
    return set;
  });
}

export function part1(input) {
  const bricks = parse(input);
  fall(bricks);

  const important = new Set();
  const support = inspect(bricks);
  support.forEach(set => {
    if (set.size === 1) set.forEach(x => important.add(x));
  });
  return bricks.length - important.size;
}

export function part2(input) {
  const bricks = parse(input);
  fall(bricks);

  let moved = 0;
  const support = inspect(bricks);
  for (let i = 0; i < bricks.length; i++) {
    const removed = new Set([i]);
    let change = true;
    while (change) {
      change = false;
      for (let j = 0; j < support.length; j++) {
        if (removed.has(j) || support[j].size === 0) continue;
        if ([...support[j]].every(x => removed.has(x))) {
          removed.add(j);
          change = true;
        }
      }
    }
    moved += removed.size - 1;
  }
  return moved;
}
