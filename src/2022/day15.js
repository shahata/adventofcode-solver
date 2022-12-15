function parse(input) {
  return input.split('\n').map(line => {
    const [, sx, sy, bx, by] = line.match(
      /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/,
    );
    return { sx: +sx, sy: +sy, bx: +bx, by: +by };
  });
}

export function part1(input, y = 2000000) {
  const sensors = parse(input);
  const options = new Set();
  for (const { sx, sy, bx, by } of sensors) {
    const distance = Math.abs(sx - bx) + Math.abs(sy - by) - Math.abs(sy - y);
    for (let x = sx - distance; x <= sx + distance; x++) {
      if (bx !== x || by !== y) options.add(x);
    }
  }
  return options.size;
}

export function part2(input, size = 4000000) {
  const sensors = parse(input);
  const lines = new Array(size + 1).fill().map(() => []);
  for (const { sx, sy, bx, by } of sensors) {
    lines.forEach((ranges, y) => {
      const distance = Math.abs(sx - bx) + Math.abs(sy - by) - Math.abs(sy - y);
      if (distance >= 0) ranges.push([sx - distance, sx + distance]);
      if (by === y) ranges.push([bx, bx]);
    });
  }
  for (let y = 0; y < lines.length; y++) {
    const ranges = lines[y].sort((a, b) => a[0] - b[0]);
    let guess = 0;
    for (const range of ranges) {
      if (guess >= range[0] && guess <= range[1]) guess = range[1] + 1;
    }
    if (guess <= size) return guess * 4000000 + y;
  }
}
