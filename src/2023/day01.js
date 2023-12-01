const rs = s => s.split('').reverse().join('');

export function part1(input) {
  const lines = input.split('\n');
  const numbers = lines.map(line => {
    const first = +line.match(/[0-9]/).at(0);
    const last = +rs(line).match(/[0-9]/).at(0);
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
  const regex = new RegExp('[0-9]|' + letters.join('|'));
  const regex2 = new RegExp('[0-9]|' + rs(letters.join('|')));
  const lines = input.split('\n');
  const numbers = lines.map(line => {
    const first = line.match(regex).at(0);
    const last = rs(line).match(regex2).at(0);

    const a = Number.isNaN(+first) ? letters.indexOf(first) : +first;
    const b = Number.isNaN(+last) ? letters.indexOf(rs(last)) : +last;
    return a * 10 + b;
  });
  return numbers.reduce((a, b) => a + b, 0);
}
