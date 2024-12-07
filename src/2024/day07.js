function getResultIfPossible(result, numbers, op) {
  let all = [numbers[0]];
  for (const n of numbers.slice(1)) {
    all = all.flatMap(x => [+`${x}${n}`, x + n, x * n].slice(op ? 0 : 1));
  }
  return all.includes(result) ? result : 0;
}

export function part1(input, op = false) {
  const results = input.split("\n").map(line => {
    let [result, numbers] = line.split(": ");
    numbers = numbers.split(" ").map(Number);
    return getResultIfPossible(+result, numbers, op);
  });
  return results.reduce((a, b) => a + b);
}

export function part2(input) {
  return part1(input, true);
}
