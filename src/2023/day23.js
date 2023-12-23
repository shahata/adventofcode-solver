function addTeleports(map) {
  const teleports = {};
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map.length; x++) {
      if (map[y][x] === '#') continue;
      const neighbors = getNeighbors(map, { x, y }, []);
      if (neighbors.length === 2) continue;
      neighbors.forEach(n => {
        let prev = { x, y };
        const trail = [prev];
        while (n) {
          const neighbors = getNeighbors(map, n, [`${prev.x},${prev.y}`]);
          trail.push(n);
          prev = n;
          if (neighbors.length === 1) n = neighbors[0];
          else n = null;
        }
        if (trail.length > 2) {
          const key1 = `${trail.at(1).x},${trail.at(1).y}`;
          const key2 = `${trail.at(-2).x},${trail.at(-2).y}`;
          teleports[key1] = { dest: trail.at(-1), steps: trail.length - 2 };
          teleports[key2] = { dest: trail.at(0), steps: trail.length - 2 };
        }
      });
    }
  }
  return teleports;
}

function getNeighbors(map, { x, y }, visited) {
  let neighbors = [
    { x: x + 1, y },
    { x: x - 1, y },
    { x, y: y + 1 },
    { x, y: y - 1 },
  ];
  if (map[y][x] === '>') neighbors = [neighbors[0]];
  if (map[y][x] === '<') neighbors = [neighbors[1]];
  if (map[y][x] === 'v') neighbors = [neighbors[2]];
  if (map[y][x] === '^') neighbors = [neighbors[3]];
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
    while (path.length > next.len) path.pop();
    path.push(`${next.x},${next.y}`);
    if (next.x === end.x && next.y === end.y) {
      best = Math.max(best, next.steps);
    } else if (teleports[`${next.x},${next.y}`]) {
      const { dest, steps } = teleports[`${next.x},${next.y}`];
      if (!path.includes(`${dest.x},${dest.y}`)) {
        stack.push({ ...dest, steps: next.steps + steps, len: path.length });
      }
    } else {
      getNeighbors(map, next, path).forEach(n =>
        stack.push({ ...n, steps: next.steps + 1, len: path.length }),
      );
    }
  }
  return best;
}

export function part1(input) {
  const map = input.split('\n').map(line => line.split(''));
  const teleports = addTeleports(map);
  let start = { x: 1, y: 0, steps: 0, len: 0 };
  let end = { x: map.length - 2, y: map.length - 1 };
  return solve(map, teleports, start, end);
}

export function part2(input) {
  return part1(input.replace(/[<>^v]/g, '.'));
}
