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
  let key = p => `${p.x},${p.y},${p.z}`;
  let visited = new Set(key(point));
  let queue = [point];

  while (queue.length > 0) {
    let next = queue.shift();
    if (cache.has(key(next)) || !checkLimits(next)) {
      visited.forEach(k => cache.add(k));
      return true;
    }
    let neighbors = getNeighbors(next).filter(point => {
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
  let cubes = input.split("\n").map(line => {
    let [x, y, z] = line.split(",").map(n => +n);
    return { x, y, z };
  });

  let key = p => `${p.x},${p.y},${p.z}`;
  let set = new Set(cubes.map(key));
  let checkExists = point => set.has(key(point));

  let minX = Math.min(...cubes.map(p => p.x));
  let maxX = Math.max(...cubes.map(p => p.x));
  let minY = Math.min(...cubes.map(p => p.y));
  let maxY = Math.max(...cubes.map(p => p.y));
  let minZ = Math.min(...cubes.map(p => p.z));
  let maxZ = Math.max(...cubes.map(p => p.z));
  function checkLimits({ x, y, z }) {
    return (
      minX <= x && maxX >= x && minY <= y && maxY >= y && minZ <= z && maxZ >= z
    );
  }

  let count = 0;
  let cache = new Set();
  for (let cube of cubes) {
    let neighbors = getNeighbors(cube).filter(p => !checkExists(p));
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
