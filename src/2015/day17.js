import { lines, sum } from '../utils/commons.js';

export function day(input, fill = 150) {
  const boxes = lines(input).map(x => +x);
  const result = new Array(boxes.length).fill(0);
  const pad = result.join('');

  for (let i = Math.pow(2, boxes.length) - 1; i > 0; i--) {
    const select = (pad + i.toString(2))
      .slice(-boxes.length)
      .split('')
      .map(x => +x);
    const results = select.map((x, index) => x * boxes[index]);
    if (sum(results) === fill) {
      result[select.filter(x => x).length - 1]++;
    }
  }

  const part1 = sum(result);
  const part2 = result.filter(x => x).shift();
  return { part1, part2 };
}
