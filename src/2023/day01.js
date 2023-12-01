export function part1(input) {
  const lines = input.split('\n');
  const nums = lines.map(line => {
    const first = +line.split('').find(c => c >= '0' && c <= '9');
    const last = +line
      .split('')
      .reverse()
      .find(c => c >= '0' && c <= '9');
    return first * 10 + last;
  });
  return nums.reduce((a, b) => a + b, 0);
}

export function part2(input) {
  const letters = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];
  const lines = input.split('\n');
  const nums = lines.map(line => {
    const first = letters
      .map(n => ({ n, i: line.indexOf(n) }))
      .filter(x => x.i > -1)
      .sort((a, b) => a.i - b.i)[0].n;
    const last = letters
      .map(n => ({ n, i: line.lastIndexOf(n) }))
      .filter(x => x.i > -1)
      .sort((a, b) => b.i - a.i)[0].n;

    const a = letters.indexOf(first) <= 9 ? letters.indexOf(first) : +first;
    const b = letters.indexOf(last) <= 9 ? letters.indexOf(last) : +last;
    return a * 10 + b;
  });
  return nums.reduce((a, b) => a + b, 0);
}
