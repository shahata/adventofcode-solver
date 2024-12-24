export function part1(input) {
  let [start, end] = input.split("-").map(Number);
  let options = 0;
  for (let i = start; i <= end; i++) {
    let digits = `${i}`.split("").sort();
    if (digits.join("") === `${i}` && `${i}`.match(/(.)\1/)) {
      options++;
    }
  }
  return options;
}

export function part2(input) {
  let [start, end] = input.split("-").map(Number);
  let options = 0;
  for (let i = start; i <= end; i++) {
    let digits = `${i}`.split("").sort();
    if (
      digits.join("") === `${i}` &&
      digits.some((x, i, a) => {
        return x === a[i + 1] && x !== a[i + 2] && x !== a[i - 1];
      })
    ) {
      options++;
    }
  }
  return options;
}
