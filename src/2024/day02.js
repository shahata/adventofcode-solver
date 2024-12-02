function isSafe(line) {
  const result = line.map((num, i) => i > 0 && num - line[i - 1]).slice(1);
  return (
    result.every(num => num >= 1 && num <= 3) ||
    result.every(num => num <= -1 && num >= -3)
  );
}

export function part1(input) {
  const lines = input.split("\n").map(line => line.split(" ").map(Number));
  return lines.filter(isSafe).length;
}

export function part2(input) {
  const lines = input.split("\n").map(line => line.split(" ").map(Number));
  return lines.filter(line => {
    return line.map((x, i) => line.toSpliced(i, 1)).find(isSafe);
  }).length;
}
