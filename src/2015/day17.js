export function day(input, fill = 150) {
  const boxes = input.split('\n').map(Number);
  const result = new Array(boxes.length).fill(0);
  const pad = result.join('');

  for (let i = Math.pow(2, boxes.length) - 1; i > 0; i--) {
    const select = (pad + i.toString(2))
      .slice(-boxes.length)
      .split('')
      .map(Number);
    if (
      select.map((x, index) => x * boxes[index]).reduce((sum, x) => sum + x) ===
      fill
    ) {
      result[select.filter(x => x).length - 1]++;
    }
  }

  const part1 = result.reduce((sum, x) => sum + x);
  const part2 = result.filter(x => x).shift();
  return { part1, part2 };
}
