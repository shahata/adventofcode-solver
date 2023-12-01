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
  const reverse = s => s.split('').reverse().join('');
  const regex = new RegExp(`[0-9]|${letters.join('|')}`);
  const regex2 = new RegExp(`[0-9]|${reverse(letters.join('|'))}`);
  const lines = input.split('\n');
  const numbers = lines.map(line => {
    const first = line.match(regex).at(0);
    const last = reverse(reverse(line).match(regex2).at(0));
    const a = Number.isNaN(+first) ? letters.indexOf(first) : +first;
    const b = Number.isNaN(+last) ? letters.indexOf(last) : +last;
    return a * 10 + b;
  });
  return numbers.reduce((a, b) => a + b, 0);
}
