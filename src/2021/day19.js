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
        const p = [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
        const distance = `${p[0]},${p[1]},${p[2]}`;
        distances.set(distance, (distances.get(distance) || 0) + 1);
        if (distances.get(distance) >= 12) {
          const abs = rotated.map(x => [x[0] + p[0], x[1] + p[1], x[2] + p[2]]);
          return { position: p, beacons: abs };
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
  const all = new Set();
  solve(input).forEach(x => x.beacons.forEach(x => all.add(x.join(','))));
  return all.size;
}

export function part2(input) {
  const scanners = solve(input);
  const distances = [];
  for (const { position: a } of scanners) {
    for (const { position: b } of scanners) {
      distances.push(a.reduce((sum, x, i) => sum + Math.abs(x - b[i]), 0));
    }
  }
  return Math.max(...distances);
}
