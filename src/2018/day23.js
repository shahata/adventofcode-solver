function parse(input) {
  return input
    .split("\n")
    .map(x => x.match(/(-?\d+),(-?\d+),(-?\d+)>, r=(-?\d+)/).map(Number))
    .map(([, x, y, z, r]) => ({ x, y, z, r }));
}

function distance(a, b = { x: 0, y: 0, z: 0 }) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
}

export function part1(input) {
  let bots = parse(input);
  let strong = bots.sort((a, b) => b.r - a.r)[0];
  let inRange = bots.filter(a => distance(a, strong) <= strong.r);
  return inRange.length;
}

export function part2(input) {
  let bots = parse(input);
  let minX = Math.min(...bots.map(b => b.x), 0);
  let maxX = Math.max(...bots.map(b => b.x), 0);
  let minY = Math.min(...bots.map(b => b.y), 0);
  let maxY = Math.max(...bots.map(b => b.y), 0);
  let minZ = Math.min(...bots.map(b => b.z), 0);
  let maxZ = Math.max(...bots.map(b => b.z), 0);
  let maxCoordinate = Math.max(
    ...[minX, maxX, minY, maxY, minZ, maxZ].map(Math.abs),
  );

  let searchDistance = 1;
  while (searchDistance < maxCoordinate) {
    searchDistance *= 2;
  }

  let queue = [
    {
      numBots: bots.length,
      searchSize: 2 * searchDistance,
      distance: 3 * searchDistance,
      minX: -searchDistance,
      minY: -searchDistance,
      minZ: -searchDistance,
    },
  ];

  let deltas = [];
  for (let x of [0, 1]) {
    for (let y of [0, 1]) {
      for (let z of [0, 1]) {
        deltas.push({ x, y, z });
      }
    }
  }

  while (queue.length > 0) {
    let current = queue.shift();
    let newSize = current.searchSize / 2;
    if (current.searchSize === 1) return current.distance;
    for (let delta of deltas) {
      let minX = current.minX + newSize * delta.x;
      let minY = current.minY + newSize * delta.y;
      let minZ = current.minZ + newSize * delta.z;
      let maxX = minX + newSize - 1;
      let maxY = minY + newSize - 1;
      let maxZ = minZ + newSize - 1;
      let numBots = bots.filter(bot => {
        let distance = 0;
        if (bot.x < minX) distance += minX - bot.x;
        else if (bot.x > maxX) distance += bot.x - maxX;
        if (bot.y < minY) distance += minY - bot.y;
        else if (bot.y > maxY) distance += bot.y - maxY;
        if (bot.z < minZ) distance += minZ - bot.z;
        else if (bot.z > maxZ) distance += bot.z - maxZ;
        return distance <= bot.r;
      }).length;
      queue.push({
        numBots,
        searchSize: newSize,
        distance: Math.abs(minX) + Math.abs(minY) + Math.abs(minZ),
        minX,
        minY,
        minZ,
      });
      queue.sort(
        (a, b) =>
          b.numBots - a.numBots ||
          b.searchSize - a.searchSize ||
          a.distance - b.distance,
      );
    }
  }
}
