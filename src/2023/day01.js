export function part1(input) {
  let lines = input.split("\n");
  let numbers = lines.map(line => {
    let first = +line.match(/[0-9]/g).at(0);
    let last = +line.match(/[0-9]/g).at(-1);
    return first * 10 + last;
  });
  return numbers.reduce((a, b) => a + b, 0);
}

export function part2(input) {
  let letters = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  let regex = new RegExp(`(?=(?<digit>[0-9]|${letters.join("|")}))`, "g");
  let lines = input.split("\n");
  let numbers = lines.map(line => {
    let first = [...line.matchAll(regex)].at(0).groups.digit;
    let last = [...line.matchAll(regex)].at(-1).groups.digit;
    let a = Number.isNaN(+first) ? letters.indexOf(first) : +first;
    let b = Number.isNaN(+last) ? letters.indexOf(last) : +last;
    return a * 10 + b;
  });
  return numbers.reduce((a, b) => a + b, 0);
}
