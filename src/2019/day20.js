function getNeighbors(map, { x, y }) {
  return [
    map[y][x - 1],
    map[y][x + 1],
    map[y - 1] && map[y - 1][x],
    map[y + 1] && map[y + 1][x],
  ].filter(x => x);
}

function calcNeighbors(map, p, visited) {
  const result = getNeighbors(map, p)
    .map(p => {
      if (p.gates && p.gates.length === 2) {
        return p.gates.find(g => g !== p).out;
      }
      return p;
    })
    .filter(p => p.c === '.' || p.end)
    .filter(p => !visited.has(p));
  result.forEach(p => visited.add(p));
  return result;
}

function calcNeighbors2(map, next, visited) {
  const result = getNeighbors(map, next.point)
    .map(p => {
      if (p.gates && p.gates.length === 2 && (next.level > 0 || !p.outer)) {
        return {
          point: p.gates.find(g => g !== p).out,
          level: p.outer ? next.level - 1 : next.level + 1,
          distance: next.distance + 1,
        };
      }
      return { point: p, level: next.level, distance: next.distance + 1 };
    })
    .filter(({ point }) => point.c === '.' || (point.end && next.level === 0))
    .filter(
      ({ point, level }) => !visited.has(`${point.x},${point.y},${level}`),
    );
  result.forEach(({ point, level }) =>
    visited.add(`${point.x},${point.y},${level}`),
  );
  return result;
}

export function part1(input) {
  const portals = {};
  let counter = 0;
  let current;

  const map = input
    .split('\n')
    .map((line, y) => line.split('').map((p, x) => ({ x, y, c: p })));
  map.forEach(line =>
    line.forEach(p => {
      if (p.c.match(/[A-Z]/)) {
        const portal = getNeighbors(map, p).find(p => p.c.match(/[A-Z]/));
        const gate = [p, portal].sort((a, b) => a.x - b.x + a.y - b.y);
        const s = gate.map(p => p.c).join('');
        const real = gate.find(p =>
          getNeighbors(map, p).find(x => x.c === '.'),
        );
        portals[s] = portals[s] || { id: `${++counter}`, gates: [] };
        if (!portals[s].gates.includes(real)) {
          portals[s].gates.push(real);
        }
        real.gates = portals[s].gates;
        real.name = s;
        real.out = getNeighbors(map, real).find(x => x.c === '.');
        real.outer =
          real.x < 4 ||
          real.y < 4 ||
          line.length - real.x < 4 ||
          map.length - real.y < 4;
        if (s === 'AA') {
          real.start = true;
          current = real.out;
        }
        if (s === 'ZZ') {
          real.end = true;
        }
      }
    }),
  );

  let queue = [{ point: current, distance: 0 }];
  const visited = new Set();
  while (queue.length > 0) {
    const next = queue.shift();
    if (next.point.end) {
      return next.distance - 1;
    }
    visited.add(next);
    queue = queue.concat(
      calcNeighbors(map, next.point, visited).map(p => ({
        point: p,
        distance: next.distance + 1,
      })),
    );
  }

  return 0;
}

export function part2(input) {
  const portals = {};
  let counter = 0;
  let current;

  const map = input
    .split('\n')
    .map((line, y) => line.split('').map((p, x) => ({ x, y, c: p })));
  map.forEach(line =>
    line.forEach(p => {
      if (p.c.match(/[A-Z]/)) {
        const portal = getNeighbors(map, p).find(p => p.c.match(/[A-Z]/));
        const gate = [p, portal].sort((a, b) => a.x - b.x + a.y - b.y);
        const s = gate.map(p => p.c).join('');
        const real = gate.find(p =>
          getNeighbors(map, p).find(x => x.c === '.'),
        );
        portals[s] = portals[s] || { id: `${++counter}`, gates: [] };
        if (!portals[s].gates.includes(real)) {
          portals[s].gates.push(real);
        }
        real.gates = portals[s].gates;
        real.name = s;
        real.out = getNeighbors(map, real).find(x => x.c === '.');
        real.outer =
          real.x < 4 ||
          real.y < 4 ||
          line.length - real.x < 4 ||
          map.length - real.y < 4;
        if (s === 'AA') {
          real.start = true;
          current = real.out;
        }
        if (s === 'ZZ') {
          real.end = true;
        }
      }
    }),
  );

  let queue = [{ point: current, distance: 0, level: 0 }];
  const visited = new Set();
  while (queue.length > 0) {
    const next = queue.shift();
    if (next.point.end) {
      return next.distance - 1;
    }
    visited.add(next);
    queue = queue.concat(calcNeighbors2(map, next, visited));
  }

  return 0;
}
