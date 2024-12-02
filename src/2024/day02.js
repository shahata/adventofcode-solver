export function part1(input) {
  const lines = input.split("\n").map(line => line.split(" ").map(Number));
  const safe = lines.filter(line => {
    const result = line
      .map((num, i) => (i === 0 ? 0 : num - line[i - 1]))
      .slice(1);
    return (
      result.every(num => num >= 1 && num <= 3) ||
      result.every(num => num <= -1 && num >= -3)
    );
  });
  return safe.length;
}

export function part2(input) {
  const lines = input.split("\n").map(line => line.split(" ").map(Number));
  const safe = lines.filter(line => {
    for (let i = 0; i < line.length; i++) {
      const newLine = line.slice();
      newLine.splice(i, 1);
      const result = newLine
        .map((num, i) => (i === 0 ? 0 : num - newLine[i - 1]))
        .slice(1);
      if (
        result.every(num => num >= 1 && num <= 3) ||
        result.every(num => num <= -1 && num >= -3)
      )
        return true;
    }
  });
  return safe.length;
}
