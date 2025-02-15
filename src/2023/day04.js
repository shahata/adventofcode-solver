function parse(input) {
  return input.split("\n").map(line => {
    let [, numbers] = line.split(":");
    let [left, right] = numbers
      .split("|")
      .map(s => s.trim().split(/\s+/).map(Number));
    return right.filter(n => left.includes(n)).length;
  });
}

export function part1(input) {
  let cards = parse(input);
  return cards.map(x => (x > 0 ? 2 ** (x - 1) : 0)).reduce((a, b) => a + b, 0);
}

export function part2(input) {
  let cards = parse(input);
  let seen = {};
  for (let i = 0; i < cards.length; i++) {
    seen[i] = 1;
  }
  for (let i = 0; i < cards.length; i++) {
    for (let j = 1; j <= cards[i]; j++) {
      seen[i + j] += seen[i];
    }
  }
  return Object.values(seen).reduce((a, b) => a + b, 0);
}
