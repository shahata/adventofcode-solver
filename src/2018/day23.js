function parse(input) {
  return input
    .split('\n')
    .map(x =>
      x.match(/(-?\d+),(-?\d+),(-?\d+)>, r=(-?\d+)/).map(x => parseInt(x)),
    )
    .map(([, x, y, z, r]) => ({ x, y, z, r }));
}

function distance(a, b = { x: 0, y: 0, z: 0 }) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z);
}

function part1(input) {
  const bots = parse(input);
  const strong = bots.sort((a, b) => b.r - a.r)[0];
  const inRange = bots.filter(a => distance(a, strong) <= strong.r);
  return inRange.length;
}

function scaled(bots, scale) {
  return bots.map(bot => ({
    x: bot.x / scale,
    y: bot.y / scale,
    z: bot.z / scale,
    r: bot.r / scale,
  }));
}

function max(bots, x, y, z, best) {
  const count = bots.filter(b => distance({ x, y, z }, b) <= b.r).length;
  if (count > best.count) {
    return { x, y, z, count };
  } else if (count === best.count && distance({ x, y, z }) < distance(best)) {
    return { x, y, z, count };
  } else {
    return best;
  }
}

function part2(input) {
  const bots = parse(input);
  let scale = Math.pow(2, 25);
  let scaledBots = scaled(bots, scale);
  let ranges = scaledBots.reduce(
    (r, b) => ({
      x: { min: Math.min(r.x.min, b.x), max: Math.max(r.x.max, b.x) },
      y: { min: Math.min(r.y.min, b.y), max: Math.max(r.y.max, b.y) },
      z: { min: Math.min(r.z.min, b.z), max: Math.max(r.z.max, b.z) },
    }),
    {
      x: { min: Infinity, max: -Infinity },
      y: { min: Infinity, max: -Infinity },
      z: { min: Infinity, max: -Infinity },
    },
  );

  let best;
  while (scale >= 1) {
    best = { count: 0 };
    for (let x = ranges.x.min; x <= ranges.x.max; x++) {
      for (let y = ranges.y.min; y <= ranges.y.max; y++) {
        for (let z = ranges.z.min; z <= ranges.z.max; z++) {
          best = max(scaledBots, x, y, z, best);
        }
      }
    }
    ranges = {
      x: { min: (best.x - 1) * 2, max: (best.x + 1) * 2 },
      y: { min: (best.y - 1) * 2, max: (best.y + 1) * 2 },
      z: { min: (best.z - 1) * 2, max: (best.z + 1) * 2 },
    };
    scale = scale / 2;
    scaledBots = scaled(bots, scale);
  }
  return distance(best, { x: 0, y: 0, z: 0 });
}

module.exports = { part1, part2 };
