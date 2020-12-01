export function part1(input) {
  const items = input.split('\n').map(x => parseInt(x));
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      if (items[i] + items[j] === 2020) {
        return items[i] * items[j];
      }
    }
  }
}

export function part2(input) {
  const items = input.split('\n').map(x => parseInt(x));
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      for (let k = j + 1; k < items.length; k++) {
        if (items[i] + items[j] + items[k] === 2020) {
          return items[i] * items[j] * items[k];
        }
      }
    }
  }
}
