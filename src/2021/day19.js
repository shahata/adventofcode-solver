function rotate([x, y, z], orientation) {
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
  ][orientation];
}

function match(a, b) {
  for (let index = 0; index < 24; index++) {
    const distances = {};
    a.forEach(beacon => {
      b.map(x => rotate(x, index)).forEach(rotation => {
        const distance = beacon.map((x, i) => x - rotation[i]).join(',');
        distances[distance] = (distances[distance] || 0) + 1;
      });
    });
    const [key, max] = Object.entries(distances).sort((a, b) => b[1] - a[1])[0];
    const position = key.split(',').map(x => +x);
    if (max >= 12) {
      return {
        position,
        beacons: b.map(x => rotate(x, index).map((x, i) => x + position[i])),
      };
    }
  }
}

function solve(input) {
  const skip = [];
  const scanners = input
    .replaceAll(/^--.*\n/gm, '')
    .split('\n\n')
    .map(lines => lines.split('\n').map(c => c.split(',').map(x => +x)));
  const solution = [{ position: [0, 0, 0], beacons: scanners.shift() }];
  while (scanners.length > 0) {
    for (const a of solution) {
      for (const b of scanners) {
        if (skip.find(x => x.a === a && x.b === b)) continue;
        const result = match(a.beacons, b);
        if (result) {
          scanners.splice(scanners.indexOf(b), 1);
          solution.push(result);
        } else {
          skip.push({ a, b });
        }
      }
    }
  }
  return solution;
}

export function part1(input) {
  const scanners = solve(input);
  const beacons = new Set(
    scanners.map(x => x.beacons.map(x => x.join(','))).flat(),
  );
  return beacons.size;
}

export function part2(input) {
  const scanners = solve(input);
  let max = 0;
  for (const a of scanners) {
    for (const b of scanners) {
      const distance = (a, b) =>
        Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
      max = Math.max(max, distance(a.position, b.position));
    }
  }
  return max;
}
