function parse(input) {
  return input.split('\n\n').map(lines =>
    lines
      .split('\n')
      .slice(1)
      .map(c => c.split(',').map(x => +x)),
  );
}

function rotate([x, y, z]) {
  return [
    [x, y, z],
    [-y, x, z],
    [-x, -y, z],
    [y, -x, z],
    [z, y, -x],
    [-y, z, -x],
    [-z, -y, -x],
    [y, -z, -x],
    [-x, y, -z],
    [-y, -x, -z],
    [x, -y, -z],
    [y, x, -z],
    [-z, y, x],
    [y, z, x],
    [z, -y, x],
    [-y, -z, x],
    [-z, -x, y],
    [-x, z, y],
    [z, x, y],
    [x, -z, y],
    [x, z, -y],
    [z, -x, -y],
    [-x, -z, -y],
    [-z, x, -y],
  ];
}

function match(a, b) {
  for (let j = 0; j < 24; j++) {
    const distances = {};
    for (const beaconA of a) {
      for (const beaconB of b) {
        const rotationA = rotate(beaconA)[0];
        const rotationB = rotate(beaconB)[j];
        const distance = `${rotationA[0] - rotationB[0]},${
          rotationA[1] - rotationB[1]
        },${rotationA[2] - rotationB[2]}`;
        distances[distance] = (distances[distance] || 0) + 1;
      }
    }
    const max = Math.max(...Object.values(distances));
    if (max >= 12) {
      return {
        rotation: j,
        distance: Object.keys(distances).find(x => distances[x] === max),
      };
    }
  }
}

function next(absolute, scanners) {
  for (const a of absolute) {
    for (const b of scanners) {
      const result = match(a, b);
      if (result) {
        return { ...result, scanner: b };
      }
    }
  }
}

export function part1(input) {
  let scanners = parse(input);
  const absolute = [scanners.shift()];
  while (scanners.length > 0) {
    const found = next(absolute, scanners);
    scanners = scanners.filter(x => x !== found.scanner);
    absolute.push(
      found.scanner.map(x => {
        const coord = rotate(x)[found.rotation];
        const distance = found.distance.split(',').map(x => +x);
        return [
          coord[0] + distance[0],
          coord[1] + distance[1],
          coord[2] + distance[2],
        ];
      }),
    );
  }
  return new Set(absolute.flat().map(x => `${x[0]},${x[1]},${x[2]}`)).size;
}

export function part2(input) {
  let scanners = parse(input);
  const absolute = [scanners.shift()];
  const positions = [[0, 0, 0]];
  while (scanners.length > 0) {
    const found = next(absolute, scanners);
    scanners = scanners.filter(x => x !== found.scanner);
    positions.push(found.distance.split(',').map(x => +x));
    absolute.push(
      found.scanner.map(x => {
        const coord = rotate(x)[found.rotation];
        const distance = found.distance.split(',').map(x => +x);
        return [
          coord[0] + distance[0],
          coord[1] + distance[1],
          coord[2] + distance[2],
        ];
      }),
    );
  }
  let max = 0;
  for (const a of positions) {
    for (const b of positions) {
      max = Math.max(
        max,
        Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]),
      );
    }
  }
  return max;
}
