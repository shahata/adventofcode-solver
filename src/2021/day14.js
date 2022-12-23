export function part1(input, times = 10) {
  const map = {};
  let [polymer, pairs] = input.split('\n\n');
  pairs.split('\n').forEach(line => {
    map[line.split(' -> ')[0]] = line.split(' -> ')[1];
  });
  let pairsMap = {};
  for (let i = 0; i < polymer.length - 1; i++) {
    const key = polymer[i] + polymer[i + 1];
    pairsMap[key] = (pairsMap[key] || 0) + 1;
  }
  for (let i = 0; i < times; i++) {
    let next = {};
    for (let key in pairsMap) {
      const insert = map[key];
      next[key[0] + insert] = (next[key[0] + insert] || 0) + pairsMap[key];
      next[insert + key[1]] = (next[insert + key[1]] || 0) + pairsMap[key];
    }
    pairsMap = next;
  }
  const charMap = { [polymer[0]]: 1, [polymer.at(-1)]: 1 };
  for (let key in pairsMap) {
    charMap[key[0]] = (charMap[key[0]] || 0) + pairsMap[key];
    charMap[key[1]] = (charMap[key[1]] || 0) + pairsMap[key];
  }
  const max = Math.max(...Object.values(charMap));
  const min = Math.min(...Object.values(charMap));
  return (max - min) / 2;
}

export function part2(input) {
  return part1(input, 40);
}
