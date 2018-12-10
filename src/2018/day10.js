function move(points, seconds) {
  return points.map(p => ({
    x: p.x + p.xDiff * seconds,
    y: p.y + p.yDiff * seconds,
  }));
}

function print(points) {
  const { start, end } = points.reduce(
    ({ start, end }, p) => ({
      start: { x: Math.min(start.x, p.x), y: Math.min(start.y, p.y) },
      end: { x: Math.max(end.x, p.x + 1), y: Math.max(end.y, p.y + 1) },
    }),
    {
      start: { x: Infinity, y: Infinity },
      end: { x: -Infinity, y: -Infinity },
    },
  );
  // avoid allocating arrays bigger than 1K. this is quite arbitrary heuristic I added
  // in order to ignore results that are not dense enough to contain the text
  if ((end.y - start.y) * (end.x - start.x) < 1000) {
    const arr = (size, fill) => new Array(size).fill(fill);
    const banner = arr(end.y - start.y).map(() => arr(end.x - start.x, '.'));
    points.forEach(p => (banner[p.y - start.y][p.x - start.x] = '#'));
    const result = banner.map(x => x.join('')).join('\n');
    // again arbitrary heuristic. we take the first dense result that contains
    // five consecutive dashes (or in other words, something that might resemble a letter)
    return result.includes('#####') && result;
  }
}

function day(input) {
  const regex = /([-\d]+)[^-\d]*([-\d]+)[^-\d]*([-\d]+)[^-\d]*([-\d]+)+/;
  const points = input.split('\n').map(line => {
    const [, x, y, xDiff, yDiff] = line.match(regex).map(x => parseInt(x));
    return { x, y, xDiff, yDiff };
  });
  let result, secs;
  for (secs = 0; !result; secs++) {
    result = print(move(points, secs));
  }
  return { part1: '\n' + result, part2: secs - 1 };
}

module.exports = { day };
