function findTeleports(map) {
  const teleports = {};
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === '#') continue;
      const neighbors = getNeighbors(map, { x, y });
      if (neighbors.length === 2) continue;
      neighbors.forEach(n => {
        let neighbors;
        let curr = n;
        let prev = { x, y };
        let steps = -1;
        do {
          neighbors = getNeighbors(map, curr, [`${prev.x},${prev.y}`]);
          steps++;
          prev = curr;
          curr = neighbors[0];
        } while (neighbors.length === 1);
        if (steps > 0) teleports[`${n.x},${n.y}`] = { dest: prev, steps };
      });
    }
  }
  return teleports;
}

function getNeighbors(map, { x, y, steps = 0 }, visited = [], teleports = {}) {
  let neighbors = [
    { x: x + 1, y, steps: steps + 1 },
    { x: x - 1, y, steps: steps + 1 },
    { x, y: y + 1, steps: steps + 1 },
    { x, y: y - 1, steps: steps + 1 },
  ];
  if (map[y][x] === '>') neighbors = [neighbors[0]];
  if (map[y][x] === '<') neighbors = [neighbors[1]];
  if (map[y][x] === 'v') neighbors = [neighbors[2]];
  if (map[y][x] === '^') neighbors = [neighbors[3]];
  neighbors = neighbors.map(n => {
    const { dest, steps } = teleports[`${n.x},${n.y}`] || {};
    return dest ? { ...dest, steps: n.steps + steps } : n;
  });
  return neighbors.filter(
    n =>
      map[n.y]?.[n.x] &&
      map[n.y][n.x] !== '#' &&
      !visited.includes(`${n.x},${n.y}`),
  );
}

function solve(map, teleports, start, end) {
  let best = 0;
  const path = [];
  const stack = [start];
  while (stack.length > 0) {
    const next = stack.pop();
    path.splice(next.len, Infinity, `${next.x},${next.y}`);
    if (next.x === end.x && next.y === end.y) best = Math.max(best, next.steps);
    const neighbors = getNeighbors(map, next, path, teleports);
    neighbors.forEach(n => stack.push({ ...n, len: path.length }));
  }
  return best;
}

export function part1(input) {
  const map = input.split('\n').map(line => line.split(''));
  const teleports = findTeleports(map);
  let start = { x: 1, y: 0, steps: 0, len: 0 };
  let end = { x: map.length - 2, y: map.length - 1 };
  return solve(map, teleports, start, end);
}

export function part2(input) {
  return part1(input.replace(/[<>^v]/g, '.'));
}
