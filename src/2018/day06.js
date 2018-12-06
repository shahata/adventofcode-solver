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
  const closest = distances.filter(x => x.distance === distances[0].distance);
  return closest.length === 1 && closest[0].i;
}

function calcBlastSize(points, size) {
  const result = points.map(() => 0);
  for (let x = 0; x < size.x; x++) {
    for (let y = 0; y < size.y; y++) {
      result[blastSource({ x, y }, points)]++;
    }
  }
  return result;
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

function part1(input) {
  const { points, size } = parseInput(input);
  const points2 = points.map(({ x, y }) => ({ x: x + 1, y: y + 1 }));
  const size2 = { x: size.x + 2, y: size.y + 2 };
  const a = calcBlastSize(points, size);
  const b = calcBlastSize(points2, size2);
  const finite = a.filter((x, i) => x === b[i]);
  return finite.sort((a, b) => a - b).pop();
}

function part2(input, limit = 10000) {
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

module.exports = { part1, part2 };
