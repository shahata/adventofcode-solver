function mix(original, numbers) {
  for (const move of original) {
    const prev = numbers.indexOf(move);
    numbers.splice(prev, 1);

    const next = (prev + move.num) % numbers.length;
    if (next === 0 && move.num !== 0) numbers.push(move);
    else numbers.splice(next, 0, move);
  }
}

export function part1(input, key = 1, times = 1) {
  const original = input.split('\n').map(x => ({ num: +x * key }));
  const numbers = original.slice(0);
  for (let i = 0; i < times; i++) mix(original, numbers);

  const base = numbers.findIndex(x => x.num === 0);
  if (numbers.length < 1000) return numbers.map(x => x.num).join(', ');
  return (
    numbers[base + 1000].num +
    numbers[base + 2000].num +
    numbers[base + 3000].num
  );
}

export function part2(input) {
  return part1(input, 811589153, 10);
}
