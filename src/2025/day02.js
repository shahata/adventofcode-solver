function invalidSum(input, regex) {
  let ranges = input.split(",").map(range => range.split("-").map(Number));
  let sum = 0;
  for (let range of ranges) {
    for (let i = range[0]; i <= range[1]; i++) {
      if (`${i}`.match(regex)) sum += i;
    }
  }
  return sum;
}

export function part1(input) {
  return invalidSum(input, /^(\d+)\1$/);
}

export function part2(input) {
  return invalidSum(input, /^(\d+)\1+$/);
}
