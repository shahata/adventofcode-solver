export function part1(input, y = 2000000) {
  const sensors = input.split('\n').map(line => {
    const [, sx, sy, bx, by] = line.match(
      /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/,
    );
    return { sx: +sx, sy: +sy, bx: +bx, by: +by };
  });
  const options = new Set();
  let beacons = new Set();
  for (const { sx, sy, bx, by } of sensors) {
    const distance = Math.abs(sx - bx) + Math.abs(sy - by) - Math.abs(sy - y);
    for (let i = sx - distance; i <= sx + distance; i++) options.add(i);
    if (by === y) beacons.add(bx);
  }
  return options.size - beacons.size;
}

export function part2(input, size = 4000000) {
  const sensors = input.split('\n').map(line => {
    const [, sx, sy, bx, by] = line.match(
      /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/,
    );
    return { sx: +sx, sy: +sy, bx: +bx, by: +by };
  });
  const map = new Array(size + 1).fill().map(() => []);
  for (const { sx, sy, bx, by } of sensors) {
    map.forEach((ranges, y) => {
      const distance = Math.abs(sx - bx) + Math.abs(sy - by) - Math.abs(sy - y);
      if (distance >= 0) ranges.push([sx - distance, sx + distance]);
      if (by === y) ranges.push([bx, bx]);
    });
  }
  for (let y = 0; y < map.length; y++) {
    const ranges = map[y].sort((a, b) => a[0] - b[0]);
    let guess = 0;
    for (const range of ranges) {
      if (range[0] <= guess && range[1] >= guess) guess = range[1] + 1;
    }
    if (guess <= size) return guess * 4000000 + y;
  }
}
