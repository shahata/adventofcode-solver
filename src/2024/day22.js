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
  let cache = new Map();
  for (let prev of numbers) {
    let visited = new Set();
    let diffs = [];
    for (let i = 0; i < 2000; i++) {
      let next = hash(prev);
      diffs.push(Number((next % 10n) - (prev % 10n)));
      prev = next;
      if (diffs.length >= 4) {
        let key = diffs.slice(-4).join(",");
        if (!visited.has(key)) {
          let sum = (cache.get(key) || 0) + Number(next % 10n);
          cache.set(key, sum);
          visited.add(key);
        }
      }
    }
  }
  return Math.max(...cache.values());
}
