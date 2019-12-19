function calcKey(points, keys) {
  return [
    points.map(p => `(${p.x},${p.y})`).join(','),
    keys.sort().join(''),
  ].join(':');
}

function blockDeadEnds(map, current, visited = []) {
  visited.push(current);
  const neighbors = [
    map[current.y - 1] && map[current.y - 1][current.x],
    map[current.y + 1] && map[current.y + 1][current.x],
    map[current.y][current.x - 1],
    map[current.y][current.x + 1],
  ].filter(p => p && p.c !== '#');
  const filtered = neighbors.filter(p => !visited.includes(p));
  const blocked = filtered.filter(p => blockDeadEnds(map, p, visited));
  if (
    filtered.length + 1 === neighbors.length &&
    blocked.length === filtered.length &&
    current.c === '.'
  ) {
    current.c = '#';
    return true;
  }
}

function findNextKeys(map, point, keys) {
  const nextKeys = [];
  let queue = [{ point, distance: 0 }];
  const visited = new Set();
  while (queue.length) {
    const next = queue.shift();
    visited.add(next.point);
    [
      map[next.point.y - 1] && map[next.point.y - 1][next.point.x],
      map[next.point.y + 1] && map[next.point.y + 1][next.point.x],
      map[next.point.y][next.point.x - 1],
      map[next.point.y][next.point.x + 1],
    ]
      .filter(p => p && p.c !== '#' && !visited.has(p))
      .filter(p => !p.c.match(/[A-Z]/) || keys.includes(p.c.toLowerCase()))
      .forEach(p => {
        if (p.c.match(/[a-z]/) && !keys.includes(p.c)) {
          nextKeys.push({ key: p.c, point: p, distance: next.distance + 1 });
        } else {
          queue.push({ point: p, distance: next.distance + 1 });
        }
      });
  }
  return nextKeys;
}

function minimumDistance(map, points, keys = [], memo = {}) {
  const memoKey = calcKey(points, keys);
  if (!memo[memoKey]) {
    const nextKeysPerPoint = points.map(point =>
      findNextKeys(map, point, keys),
    );
    if (nextKeysPerPoint.reduce((sum, x) => sum + x.length, 0) === 0) {
      memo[memoKey] = 0;
    } else {
      const distances = nextKeysPerPoint.map((nextKeys, i) => {
        const distances = nextKeys.map(x => {
          const nextPoints = points.map((p, j) => (i === j ? x.point : p));
          return (
            x.distance +
            minimumDistance(map, nextPoints, keys.concat([x.key]), memo)
          );
        });
        return Math.min(...distances);
      });
      memo[memoKey] = Math.min(...distances);
    }
  }
  return memo[memoKey];
}

function mutate(map) {
  const line = map.find(line => line.find(p => p.c === '@'));
  const current = line.find(p => p.c === '@');
  [
    map[current.y][current.x],
    map[current.y + 1][current.x],
    map[current.y - 1][current.x],
    map[current.y][current.x + 1],
    map[current.y][current.x - 1],
  ].forEach(p => (p.c = '#'));
  const currents = [
    map[current.y + 1][current.x + 1],
    map[current.y + 1][current.x - 1],
    map[current.y - 1][current.x + 1],
    map[current.y - 1][current.x - 1],
  ];
  currents.forEach(p => (p.c = '.'));
  return currents;
}

export function part1(input) {
  const map = input
    .split('\n')
    .map((line, y) => line.split('').map((c, x) => ({ c, x, y })));
  const line = map.find(line => line.find(p => p.c === '@'));
  const current = line.find(p => p.c === '@');

  blockDeadEnds(map, current);
  return minimumDistance(map, [current]);
}

export function part2(input) {
  const map = input
    .split('\n')
    .map((line, y) => line.split('').map((c, x) => ({ c, x, y })));
  const currents = mutate(map);

  currents.forEach(point => blockDeadEnds(map, point));
  return minimumDistance(map, currents);
}
