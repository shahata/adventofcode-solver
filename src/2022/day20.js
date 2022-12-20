function mix(original, numbers) {
  for (const move of original) {
    let i = numbers.indexOf(move);
    const next = numbers.splice(i, 1)[0];
    const pos = (i + next.num) % numbers.length;
    if (pos === 0 && next.num !== 0) numbers.push(next);
    else numbers.splice(pos, 0, next);
  }
}
export function part1(input, key = 1, times = 1) {
  const original = input.split('\n').map(x => ({ num: +x * key }));
  const numbers = original.slice(0);
  for (let i = 0; i < times; i++) mix(original, numbers);
  const base = numbers.findIndex(x => x.num === 0);
  if (numbers.length < 1000) return numbers.map(x => x.num).join(', ');
  return [1000, 2000, 3000]
    .map(n => numbers[base + n].num)
    .reduce((a, b) => a + b);
}

export function part2(input) {
  return part1(input, 811589153, 10);
}
