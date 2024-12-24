export function part1(input) {
  return input
    .split("\n")
    .map(line => {
      let numbers = line
        .split(/\s+/)
        .map(Number)
        .sort((a, b) => a - b);
      return numbers.pop() - numbers.shift();
    })
    .reduce((sum, x) => sum + x, 0);
}

export function part2(input) {
  return input
    .split("\n")
    .map(line => {
      let numbers = line
        .split(/\s+/)
        .map(Number)
        .sort((a, b) => a - b);
      let divisible = a => b => a % b === 0;
      let a, b;
      while (numbers.length > 0 && b === undefined) {
        a = numbers.pop();
        b = numbers.find(divisible(a));
      }
      return a / b;
    })
    .reduce((sum, x) => sum + x, 0);
}
