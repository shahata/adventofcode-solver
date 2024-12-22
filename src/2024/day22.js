function hash(n) {
  n = (n ^ (n * 64n)) % 16777216n;
  n = (n ^ (n / 32n)) % 16777216n;
  n = (n ^ (n * 2048n)) % 16777216n;
  return n;
}

export function part1(input) {
  let numbers = input.split("\n").map(BigInt);
  for (let i = 0; i < 2000; i++) numbers = numbers.map(hash);
  return numbers.reduce((a, b) => a + b, 0n);
}

export function part2(input) {
  let numbers = input.split("\n").map(BigInt);
  let diffs = numbers.map(() => []);
  let cache = new Map();
  let max = 0;
  for (let i = 0; i < 2000; i++) {
    numbers = numbers.map((prev, j) => {
      let next = hash(prev);
      diffs[j].push(Number((next % 10n) - (prev % 10n)));
      if (diffs[j].length >= 4) {
        let key = diffs[j].slice(-4).join(",");
        let value = cache.get(key) || { sum: 0, set: new Set() };
        if (!value.set.has(j)) {
          value.set.add(j);
          value.sum += Number(next % 10n);
          max = Math.max(max, value.sum);
        }
        cache.set(key, value);
      }
      return next;
    });
  }
  return max;
}
