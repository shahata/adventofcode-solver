const go = {
  w: ({ x, y }) => ({ x: x - 1, y }),
  e: ({ x, y }) => ({ x: x + 1, y }),
  nw: ({ x, y }) => ({ x: x - 0.5, y: y - 1 }),
  ne: ({ x, y }) => ({ x: x + 0.5, y: y - 1 }),
  sw: ({ x, y }) => ({ x: x - 0.5, y: y + 1 }),
  se: ({ x, y }) => ({ x: x + 0.5, y: y + 1 }),
};

function parse(input) {
  const instructions = input
    .split('\n')
    .map(line => line.match(/(w|e|nw|ne|sw|se)/g));
  const map = new Map();
  instructions.forEach(x => {
    let position = { x: 0, y: 0 };
    x.forEach(direction => (position = go[direction](position)));
    const key = `${position.x},${position.y}`;
    map.set(key, !map.get(key));
  });
  return map;
}

export function part1(input) {
  const map = parse(input);
  return [...map.values()].filter(x => x).length;
}

function neighbors(key) {
  const [x, y] = key.split(',').map(x => +x);
  return Object.values(go)
    .map(f => f({ x, y }))
    .map(p => `${p.x},${p.y}`);
}

export function part2(input) {
  let map = parse(input);
  let count;
  for (let i = 0; i < 100; i++) {
    let next = new Map();
    let missing = [];
    count = 0;
    for (let key of map.keys()) {
      if (map.get(key)) {
        missing = missing.concat(neighbors(key).filter(key => !map.has(key)));
      }
    }
    missing.forEach(key => map.set(key, false));

    for (let key of map.keys()) {
      const active = neighbors(key).filter(key => map.get(key)).length;
      next.set(key, (map.get(key) && active === 1) || active === 2);
      if (next.get(key)) {
        count++;
      }
    }
    map = next;
  }
  return count;
}
