function toColumns(thing) {
  thing = thing.split("\n");
  return new Array(thing[0].length).fill().map((_, i) => {
    return thing.map(row => row[i]).filter(x => x === "#").length;
  });
}

export function part1(input) {
  let keys = [];
  let locks = [];
  input.split("\n\n").forEach(thing => {
    if (thing.startsWith("#####")) locks.push(toColumns(thing));
    if (thing.endsWith("#####")) keys.push(toColumns(thing));
  });

  let count = 0;
  for (let lock of locks) {
    for (let key of keys) {
      if (lock.every((_, i) => lock[i] + key[i] <= 7)) count++;
    }
  }
  return count;
}

export function part2() {
  return undefined;
}
