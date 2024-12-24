function parse(input) {
  return input.split("\n").map(line => {
    let [, sx, sy, bx, by] = line.match(
      /^Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/,
    );
    return { sx: +sx, sy: +sy, bx: +bx, by: +by };
  });
}

export function part1(input, y = 2000000) {
  let sensors = parse(input);
  let options = new Set();
  for (let { sx, sy, bx, by } of sensors) {
    let distance = Math.abs(sx - bx) + Math.abs(sy - by) - Math.abs(sy - y);
    for (let x = sx - distance; x <= sx + distance; x++) {
      if (bx !== x || by !== y) options.add(x);
    }
  }
  return options.size;
}

export function part2(input, size = 4000000) {
  let sensors = parse(input);
  for (let y = 0; y <= size; y++) {
    let ranges = [];
    for (let { sx, sy, bx, by } of sensors) {
      let distance = Math.abs(sx - bx) + Math.abs(sy - by) - Math.abs(sy - y);
      if (distance >= 0) ranges.push([sx - distance, sx + distance]);
      if (by === y) ranges.push([bx, bx]);
    }
    ranges = ranges.sort((a, b) => a[0] - b[0]);

    let guess = 0;
    for (let range of ranges) {
      if (guess >= range[0] && guess <= range[1]) guess = range[1] + 1;
    }
    if (guess <= size) return guess * 4000000 + y;
  }
}
