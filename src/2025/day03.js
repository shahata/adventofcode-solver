export function part1(input, batteries = 2) {
  let lines = input.split("\n").map(line => line.split("").map(Number));
  let voltage = lines.map(line => {
    let result = 0;
    for (let i = batteries - 1; i >= 0; i--) {
      let max = Math.max(...line.slice(0, line.length - i));
      let index = line.findIndex(x => x === max);
      line = line.slice(index + 1);
      result = result * 10 + max;
    }
    return result;
  });
  return voltage.reduce((a, b) => a + b);
}

export function part2(input) {
  return part1(input, 12);
}
