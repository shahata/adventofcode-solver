function parse(input) {
  const numbers = input.split('\n').map(x => {
    return parseInt(
      x
        .split('')
        .map(c => (c === 'F' || c === 'L' ? '0' : '1'))
        .join(''),
      2,
    );
  });
  return numbers.sort((a, b) => a - b);
}

export function part1(input) {
  const numbers = parse(input);
  return numbers[numbers.length - 1];
}

export function part2(input) {
  const numbers = parse(input);
  return numbers.find((n, i) => n - numbers[0] !== i) - 1;
}
