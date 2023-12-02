export function part1(input) {
  const lines = input.split('\n');
  const numbers = lines.map(line => {
    const first = +line.match(/[0-9]/g).at(0);
    const last = +line.match(/[0-9]/g).at(-1);
    return first * 10 + last;
  });
  return numbers.reduce((a, b) => a + b, 0);
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
  ];
  const regex = new RegExp(`(?=(?<digit>[0-9]|${letters.join('|')}))`, 'g');
  const lines = input.split('\n');
  const numbers = lines.map(line => {
    const first = [...line.matchAll(regex)].at(0).groups.digit;
    const last = [...line.matchAll(regex)].at(-1).groups.digit;
    const a = Number.isNaN(+first) ? letters.indexOf(first) : +first;
    const b = Number.isNaN(+last) ? letters.indexOf(last) : +last;
    return a * 10 + b;
  });
  return numbers.reduce((a, b) => a + b, 0);
}
