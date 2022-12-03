function toNumber(c) {
  const isLower = c.toLowerCase() === c;
  if (isLower) return c.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  else return c.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
}

export function part1(input) {
  const sacks = input.split('\n').map(x => x.split('').map(toNumber));
  const p = sacks.map(sack => {
    const a = sack.slice(0, sack.length / 2);
    const b = sack.slice(sack.length / 2, sack.length);
    return a.find(x => b.includes(x));
  });
  return p.reduce((a, b) => a + b);
}

export function part2(input) {
  const sacks = input.split('\n').map(x => x.split('').map(toNumber));
  let sum = 0;
  while (sacks.length) {
    const a = sacks.shift();
    const b = sacks.shift();
    const c = sacks.shift();
    sum += a.find(x => b.includes(x) && c.includes(x));
  }
  return sum;
}
