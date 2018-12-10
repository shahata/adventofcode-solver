function move(points, seconds) {
  return points.map(p => ({
    x: p.x + p.diffx * seconds,
    y: p.y + p.diffy * seconds,
  }));
}

function print(points) {
  const { start, end } = points.reduce(
    ({ start, end }, p) => ({
      start: { x: Math.min(start.x, p.x), y: Math.min(start.y, p.y) },
      end: { x: Math.max(end.x, p.x), y: Math.max(end.y, p.y) },
    }),
    {
      start: { x: Infinity, y: Infinity },
      end: { x: -Infinity, y: -Infinity },
    },
  );
  if ((end.y - start.y + 1) * (end.x - start.x + 1) < 10000) {
    const banner = new Array(end.y - start.y + 1)
      .fill()
      .map(() => new Array(end.x - start.x + 1).fill('.'));
    points.forEach(p => (banner[p.y - start.y][p.x - start.x] = '#'));
    return banner.map(x => x.join('')).join('\n');
  }
}

function day(input) {
  const regex = /([-\d]+)[^-\d]*([-\d]+)[^-\d]*([-\d]+)[^-\d]*([-\d]+)+/;
  const points = input.split('\n').map(line => {
    const [, x, y, diffx, diffy] = line.match(regex).map(x => parseInt(x));
    return { x, y, diffx, diffy };
  });
  let result, secs;
  for (secs = 0; !result || !result.includes('####'); secs++) {
    result = print(move(points, secs));
  }
  return { part1: `\n${print(move(points, secs))}`, part2: secs };
}

module.exports = { day };
