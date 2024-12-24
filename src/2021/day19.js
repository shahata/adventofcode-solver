function rotate([x, y, z], orientation) {
  return [
    [x, y, z],
    [x, z, -y],
    [x, -y, -z],
    [x, -z, y],
    [y, x, -z],
    [y, z, x],
    [y, -x, z],
    [y, -z, -x],
    [z, x, y],
    [z, y, -x],
    [z, -x, -y],
    [z, -y, x],
    [-x, y, -z],
    [-x, z, y],
    [-x, -y, z],
    [-x, -z, -y],
    [-y, x, z],
    [-y, z, -x],
    [-y, -x, -z],
    [-y, -z, x],
    [-z, x, -y],
    [-z, y, x],
    [-z, -x, y],
    [-z, -y, -x],
  ][orientation];
}

function match(scanner1, scanner2) {
  for (let index = 0; index < 24; index++) {
    let distances = new Map();
    let rotated = scanner2.map(x => rotate(x, index));
    for (let a of scanner1) {
      for (let b of rotated) {
        let p = [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
        let key = `${p[0]},${p[1]},${p[2]}`;
        distances.set(key, (distances.get(key) || 0) + 1);
        if (distances.get(key) >= 12) {
          let abs = rotated.map(x => [x[0] + p[0], x[1] + p[1], x[2] + p[2]]);
          return { position: p, beacons: abs };
        }
      }
    }
  }
}

function solve(input) {
  let skip = [];
  let scanners = input
    .replaceAll(/^--.*\n/gm, "")
    .split("\n\n")
    .map(lines => lines.split("\n").map(c => c.split(",").map(Number)));
  let solution = [{ position: [0, 0, 0], beacons: scanners.shift() }];
  while (scanners.length > 0) {
    for (let a of solution) {
      for (let b of scanners) {
        if (skip.find(x => x.a === a && x.b === b)) continue;
        let result = match(a.beacons, b);
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
  let all = new Set();
  solve(input).forEach(x => x.beacons.forEach(x => all.add(x.join(","))));
  return all.size;
}

export function part2(input) {
  let distances = [];
  let scanners = solve(input);
  for (let { position: a } of scanners) {
    for (let { position: b } of scanners) {
      distances.push(a.reduce((sum, x, i) => sum + Math.abs(x - b[i]), 0));
    }
  }
  return Math.max(...distances);
}
