function hash(word) {
  let hash = 0;
  for (let i = 0; i < word.length; i++) {
    hash += word.charCodeAt(i);
    hash *= 17;
    hash %= 256;
  }
  return hash;
}
export function part1(input) {
  const words = input.split(',');
  return words.map(hash).reduce((sum, hash) => sum + hash, 0);
}

export function part2(input) {
  const operations = input.split(',').map(x => {
    const [label, focal] = x.split(/[-=]/);
    return focal ? { op: '=', label, focal: +focal } : { op: '-', label };
  });
  const hashmap = new Array(256).fill().map(() => []);
  for (const operation of operations) {
    const box = hash(operation.label);
    const i = hashmap[box].findIndex(x => x.label === operation.label);
    if (operation.op === '-') {
      if (i !== -1) hashmap[box].splice(i, 1);
    } else {
      if (i === -1) hashmap[box].push(operation);
      else hashmap[box][i] = operation;
    }
  }
  return hashmap
    .flatMap((box, i) => box.map(({ focal }, j) => (i + 1) * (j + 1) * focal))
    .reduce((sum, power) => sum + power, 0);
}
