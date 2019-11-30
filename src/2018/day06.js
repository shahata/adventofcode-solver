function distance(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function totalDistance(cell, points) {
  return points.reduce((sum, p) => sum + distance(cell, p), 0);
}

function blastSource(cell, points) {
  const distances = points
    .map((p, i) => ({ i, distance: distance(cell, p) }))
    .sort((a, b) => a.distance - b.distance);
  return distances[0].distance < distances[1].distance ? distances[0].i : -1;
}

function calcBlastSize(points, size) {
  const result = new Map([[-1, Infinity]]);
  for (let x = -1; x <= size.x; x++) {
    for (let y = -1; y <= size.y; y++) {
      const src = blastSource({ x, y }, points);
      if (x < 0 || y < 0 || x === size.x || y === size.y) {
        result.set(src, Infinity);
      } else {
        result.set(src, (result.get(src) || 0) + 1);
      }
    }
  }
  return Array.from(result.values()).filter(x => x < Infinity);
}

function parseInput(input) {
  const points = input
    .split('\n')
    .map(x => x.split(', ').map(x => parseInt(x)))
    .map(([x, y]) => ({ x, y }));
  const size = points.reduce(
    (max, p) => ({ x: Math.max(max.x, p.x), y: Math.max(max.y, p.y) }),
    { x: 0, y: 0 },
  );
  return { points, size };
}

export function part1(input) {
  const { points, size } = parseInput(input);
  const result = calcBlastSize(points, size);
  return result.sort((a, b) => a - b).pop();
}

export function part2(input, limit = 10000) {
  const { points, size } = parseInput(input);
  let result = 0;
  for (let x = 0; x < size.x; x++) {
    for (let y = 0; y < size.y; y++) {
      if (totalDistance({ x, y }, points) < limit) {
        result++;
      }
    }
  }
  return result;
}
