function toNumber(c) {
  let isLower = c.toLowerCase() === c;
  if (isLower) return c.charCodeAt(0) - "a".charCodeAt(0) + 1;
  else return c.charCodeAt(0) - "A".charCodeAt(0) + 27;
}

export function part1(input) {
  let sacks = input.split("\n").map(x => x.split("").map(toNumber));
  let p = sacks.map(sack => {
    let a = sack.slice(0, sack.length / 2);
    let b = sack.slice(sack.length / 2, sack.length);
    return a.find(x => b.includes(x));
  });
  return p.reduce((a, b) => a + b);
}

export function part2(input) {
  let sacks = input.split("\n").map(x => x.split("").map(toNumber));
  let sum = 0;
  while (sacks.length) {
    let a = sacks.shift();
    let b = sacks.shift();
    let c = sacks.shift();
    sum += a.find(x => b.includes(x) && c.includes(x));
  }
  return sum;
}
