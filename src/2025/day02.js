export function part1(input) {
  let ranges = input.split(",").map(range => range.split("-").map(Number));
  let sum = 0;
  for (let range of ranges) {
    for (let i = range[0]; i <= range[1]; i++) {
      let str = i.toString();
      if (str.match(/^(\d+)\1$/)) {
        sum += i;
      }
    }
  }
  return sum;
}

export function part2(input) {
  let ranges = input.split(",").map(range => range.split("-").map(Number));
  let sum = 0;
  for (let range of ranges) {
    for (let i = range[0]; i <= range[1]; i++) {
      let str = i.toString();
      if (str.match(/^(\d+)\1+$/)) {
        sum += i;
      }
    }
  }
  return sum;
}
