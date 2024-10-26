export function part1(input, getShape = (e, x) => x) {
  const turns = input.split("\n").map(x => x.split(" "));
  const value = { A: 1, B: 2, C: 3, X: 1, Y: 2, Z: 3 };
  let score = 0;
  turns.forEach(([a, b]) => {
    const shapeA = value[a];
    const shapeB = getShape(shapeA, value[b]);
    if (shapeB - shapeA === 1 || shapeB - shapeA === -2) score += 6;
    else if (shapeA === shapeB) score += 3;
    score += shapeB;
  });
  return score;
}

export function part2(input) {
  return part1(input, (elf, outcome) => {
    if (outcome === 1) return elf - 1 === 0 ? 3 : elf - 1;
    if (outcome === 2) return elf;
    if (outcome === 3) return elf + 1 === 4 ? 1 : elf + 1;
  });
}
