const cache = {};
function nextMap(hmap, width, height) {
  if (!cache[hmap.hash]) {
    const next = new Map();
    for (const key of hmap.map.keys()) {
      const [x, y] = key.split(',').map(n => +n);
      for (const thing of hmap.map.get(key)) {
        let pos = key;
        if (thing === '>') pos = `${x === width - 2 ? 1 : x + 1},${y}`;
        if (thing === '<') pos = `${x === 1 ? width - 2 : x - 1},${y}`;
        if (thing === 'v') pos = `${x},${y === height - 2 ? 1 : y + 1}`;
        if (thing === '^') pos = `${x},${y === 1 ? height - 2 : y - 1}`;
        next.set(pos, (next.get(pos) || []).concat([thing]));
      }
    }
    const hash = [...next.entries()]
      .map(([key, value]) => {
        return `${key},${value.sort().join(',')}`;
      })
      .sort()
      .join('\n');
    cache[hmap.hash] = { map: next, hash };
  }
  return cache[hmap.hash];
}

function getNeighbors(me, width, height) {
  const { x, y, hmap } = me;
  const next = nextMap(hmap, width, height);
  const neighbors = [
    { x: x - 1, y, trip: me.trip },
    { x: x + 1, y, trip: me.trip },
    { x, y: y - 1, trip: me.trip },
    { x, y: y + 1, trip: me.trip },
    { x, y, trip: me.trip },
  ].filter(
    pos => pos.y >= 0 && pos.y < height && !next.map.has(`${pos.x},${pos.y}`),
  );
  return neighbors.map(neighbor => ({
    ...neighbor,
    steps: me.steps + 1,
    hmap: next,
    hash: JSON.stringify({ map: hmap.hash, neighbor }),
  }));
}

export function part1(input, lastTrip = 0) {
  const map = new Map();
  input.split('\n').forEach((line, y) => {
    line.split('').forEach((cell, x) => {
      if (cell !== '.') {
        map.set(`${x},${y}`, (map.get(`${x},${y}`) || []).concat([cell]));
      }
    });
  });
  const height = input.split('\n').length; //?
  const width = input.split('\n')[0].length; //?
  let queue = [
    { x: 1, y: 0, steps: 0, hash: '', hmap: { map, hash: '' }, trip: 0 },
  ];
  const end = { x: width - 2, y: height - 1 };
  const start = { x: 1, y: 0 };
  let result = [Infinity, Infinity, Infinity];
  const visited = new Set();
  while (queue.length > 0) {
    const next = queue.shift();
    const goal = next.trip % 2 === 0 ? end : start;
    if (next.x === goal.x && next.y === goal.y) {
      if (next.steps < result[next.trip]) {
        queue = queue.filter(n => n.trip <= next.trip);
      }
      result[next.trip] = Math.min(result[next.trip], next.steps);
      console.log(result[next.trip], next.trip);
      queue = queue.filter(next => {
        const goal = next.trip % 2 === 0 ? end : start;
        return (
          next.steps + (Math.abs(goal.x - next.x) + Math.abs(goal.y - next.y)) <
          result[next.trip]
        );
      });
      if (next.trip === lastTrip) continue;
      next.trip++;
    }
    const neighbors = getNeighbors(next, width, height).filter(point => {
      return !visited.has(point.hash);
    });
    if (neighbors.length === 0) {
      continue;
    }
    for (const neighbor of neighbors) {
      const goal = next.trip % 2 === 0 ? end : start;
      if (
        neighbor.steps +
          (Math.abs(goal.x - neighbor.x) + Math.abs(goal.y - neighbor.y)) >=
        result[neighbor.trip]
      ) {
        continue;
      }
      visited.add(neighbor.hash);
      queue.push(neighbor);
    }
    queue.sort((a, b) => {
      const goal = a.trip % 2 === 0 ? end : start;
      const dista = Math.abs(goal.x - a.x) + Math.abs(goal.y - a.y);
      const distb = Math.abs(goal.x - b.x) + Math.abs(goal.y - b.y);
      return a.trip - b.trip || dista - distb;
    });
  }
  return result[lastTrip];
}

export function part2(input) {
  return part1(input, 2);
}
