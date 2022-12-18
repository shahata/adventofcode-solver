function getNeighbors({ x, y, z }) {
  return [
    { x: x - 1, y, z },
    { x: x + 1, y, z },
    { x, y: y - 1, z },
    { x, y: y + 1, z },
    { x, y, z: z - 1 },
    { x, y, z: z + 1 },
  ];
}

function isExterior(point, checkExists, checkLimits, cache) {
  const key = p => `${p.x},${p.y},${p.z}`;
  const visited = new Set(key(point));
  const queue = [point];

  while (queue.length > 0) {
    const next = queue.shift();
    if (cache.has(key(next)) || !checkLimits(next)) {
      visited.forEach(k => cache.add(k));
      return true;
    }
    const neighbors = getNeighbors(next).filter(point => {
      return !checkExists(point) && !visited.has(key(point));
    });
    neighbors.forEach(neighbor => {
      visited.add(key(neighbor));
      queue.push(neighbor);
    });
  }
  return false;
}

export function part1(input, checkExterior = false) {
  const cubes = input.split('\n').map(line => {
    const [x, y, z] = line.split(',').map(n => +n);
    return { x, y, z };
  });

  const key = p => `${p.x},${p.y},${p.z}`;
  const set = new Set(cubes.map(key));
  const checkExists = point => set.has(key(point));

  const minX = Math.min(...cubes.map(p => p.x));
  const maxX = Math.max(...cubes.map(p => p.x));
  const minY = Math.min(...cubes.map(p => p.y));
  const maxY = Math.max(...cubes.map(p => p.y));
  const minZ = Math.min(...cubes.map(p => p.z));
  const maxZ = Math.max(...cubes.map(p => p.z));
  function checkLimits({ x, y, z }) {
    return (
      minX <= x && maxX >= x && minY <= y && maxY >= y && minZ <= z && maxZ >= z
    );
  }

  let count = 0;
  let cache = new Set();
  for (const cube of cubes) {
    const neighbors = getNeighbors(cube).filter(p => !checkExists(p));
    neighbors.forEach(neighbor => {
      if (!checkExterior) count++;
      else if (isExterior(neighbor, checkExists, checkLimits, cache)) count++;
    });
  }
  return count;
}

export function part2(input) {
  return part1(input, true);
}
