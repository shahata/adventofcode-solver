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

function match(scanner1, scanner2) {
  for (let index = 0; index < 24; index++) {
    const distances = new Map();
    const rotated = scanner2.map(x => rotate(x, index));
    for (const a of scanner1) {
      for (const b of rotated) {
        const distance = `${a[0] - b[0]},${a[1] - b[1]},${a[2] - b[2]}`;
        distances.set(distance, (distances.get(distance) || 0) + 1);
        if (distances.get(distance) >= 12) {
          const position = distance.split(',').map(x => +x);
          return {
            position,
            beacons: rotated.map(x => x.map((x, i) => x + position[i])),
          };
        }
      }
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
