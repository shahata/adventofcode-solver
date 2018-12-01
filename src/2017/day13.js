function parse(input) {
  return input.split('\n').map(line => {
    const [depth, range] = line.split(': ').map(x => parseInt(x, 10));
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

const part1 = input => severity(parse(input));
const part2 = input => solve(parse(input));

module.exports = { part1, part2 };
