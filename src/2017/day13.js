function parse(input) {
  return input.split("\n").map(line => {
    let [depth, range] = line.split(": ").map(Number);
    return { depth, range };
  });
}

function severity(scanners, t = 0) {
  return scanners.reduce((total, scanner) => {
    if ((t + scanner.depth) % (scanner.range + scanner.range - 2) === 0) {
      return Math.max(0, total) + scanner.depth * scanner.range;
    } else {
      return total;
    }
  }, -1);
}

function solve(scanners) {
  let i = 0;
  while (severity(scanners, i) !== -1) {
    i++;
  }
  return i;
}

export function part1(input) {
  return severity(parse(input));
}

export function part2(input) {
  return solve(parse(input));
}
