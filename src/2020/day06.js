export function part1(input) {
  return input
    .split('\n\n')
    .map(x => new Set(x.split('\n').join('').split('')).size)
    .reduce((a, b) => a + b);
}

export function part2(input) {
  return input
    .split('\n\n')
    .map(x => {
      const merged = x.split('\n').join('').split('').sort().join('');
      const count = x.split('\n').length;
      return new Set(
        merged.match(new RegExp(`(.)\\1{${count - 1}}`, 'g')) || [],
      ).size;
    })
    .reduce((a, b) => a + b);
}
