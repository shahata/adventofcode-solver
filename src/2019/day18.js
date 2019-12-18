function calcKey(point, keys) {
  return `${point.x},${point.y},${keys
    .slice(0)
    .sort()
    .join('')}`;
}

function getNeighbors(map, next, visited) {
  const key = calcKey(next.point, next.keys);
  visited.add(key);
  const options = [
    map[next.point.y - 1] && map[next.point.y - 1][next.point.x],
    map[next.point.y + 1] && map[next.point.y + 1][next.point.x],
    map[next.point.y][next.point.x - 1],
    map[next.point.y][next.point.x + 1],
  ]
    .filter(p => p && p.c !== '#')
    .filter(p => {
      if (p.c.match(/[A-Z]/) && !next.keys.includes(p.c.toLowerCase())) {
        return false;
      } else {
        return true;
      }
    });
  const full = options.map(p => {
    let keys = next.keys;
    if (p.c.match(/[a-z]/) && !keys.includes(p.c)) {
      keys = keys.concat(p.c);
    }
    return { point: p, keys, distance: next.distance + 1 };
  });
  const result = full.filter(x => !visited.has(calcKey(x.point, x.keys)));
  result.forEach(x => visited.add(calcKey(x.point, x.keys)));
  return result;
}

function calcTotalKeys(map, current) {
  let queue = [current];
  const visited = [];
  while (queue.length) {
    const next = queue.shift();
    visited.push(next);
    const neighbors = [
      map[next.y - 1] && map[next.y - 1][next.x],
      map[next.y + 1] && map[next.y + 1][next.x],
      map[next.y][next.x - 1],
      map[next.y][next.x + 1],
    ].filter(p => p && p.c !== '#' && !visited.includes(p));
    queue = queue.concat(neighbors);
  }

  const keys = new Set();
  visited.filter(p => p.c.match(/[a-z]/)).forEach(p => keys.add(p.c));
  visited.filter(p => !keys.has(p.c.toLowerCase())).forEach(p => (p.c = '.'));
  return keys.size;
}

export function part1(input) {
  const map = input
    .split('\n')
    .map((line, y) => line.split('').map((c, x) => ({ c, x, y })));
  const line = map.find(line => line.find(p => p.c === '@'));
  const current = line.find(p => p.c === '@');
  const totalKeys = calcTotalKeys(map, current);
  let queue = [{ point: current, keys: [], distance: 0 }];
  const visited = new Set();
  while (queue.length) {
    const next = queue.shift();
    if (next.keys.length === totalKeys) {
      return next.distance;
    }
    const neighbors = getNeighbors(map, next, visited);
    queue = queue.concat(neighbors);
  }
  return 0;
}

function mutate(map) {
  const line = map.find(line => line.find(p => p.c === '@'));
  const current = line.find(p => p.c === '@');
  map[current.y][current.x].c = '#';
  map[current.y + 1][current.x].c = '#';
  map[current.y - 1][current.x].c = '#';
  map[current.y][current.x + 1].c = '#';
  map[current.y][current.x - 1].c = '#';
  const currents = [
    map[current.y + 1][current.x + 1],
    map[current.y + 1][current.x - 1],
    map[current.y - 1][current.x + 1],
    map[current.y - 1][current.x - 1],
  ];
  currents.forEach(p => (p.c = '.'));
  return currents;
}

export function part2(input) {
  const map = input
    .split('\n')
    .map((line, y) => line.split('').map((c, x) => ({ c, x, y })));
  const currents = mutate(map);

  //nasty tricks, will work only with inputs with only one path to reach a key
  const steps = currents.map(current => {
    current.c = '@';
    const section = map
      .map(line => line.reduce((prev, p) => (prev += p.c), ''))
      .join('\n');
    current.c = '.';
    return part1(section);
  });
  return steps.reduce((a, b) => a + b);
}

// function getNeighbors2(map, next, visited) {
//   let result = [];
//   next.points.forEach((p, i) => {
//     const neighbors = getNeighbors(map, { ...next, point: p }, visited[i]);
//     const rest = next.points.filter(x => x !== p);
//     result = result.concat(
//       neighbors.map(n => ({ ...n, points: rest.concat(n.point) })),
//     );
//   });
//   return result;
// }

// export function part2a(input) {
//   const totalKeys = input.match(/[a-z]/g).length;
//   const map = input
//     .split('\n')
//     .map((line, y) => line.split('').map((c, x) => ({ c, x, y })));
//   const currents = mutate(map);
//   let queue = [{ points: currents, keys: [], distance: 0 }];
//   const visited = [new Set(), new Set(), new Set(), new Set()];
//   while (queue.length) {
//     const next = queue.shift();
//     if (next.keys.length === totalKeys) {
//       return next.distance;
//     }
//     const neighbors = getNeighbors2(map, next, visited);
//     if (
//       next.keys.length === totalKeys - 1 &&
//       neighbors.find(p => p.keys.length === totalKeys)
//     ) {
//       return next.distance + 1;
//     }
//     queue = queue.concat(neighbors);
//   }
//   return 0;
// }
