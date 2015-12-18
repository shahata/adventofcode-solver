'use strict';

export function day17(input) {
  let boxes = input.split('\n').map(x => parseInt(x, 10));
  let result = new Array(boxes.length).fill(0);
  let pad = result.join('');

  for (let i = Math.pow(2, boxes.length) - 1; i > 0; i--) {
    let select = (pad + i.toString(2)).slice(-boxes.length).split('').map(x => parseInt(x, 10));
    if (select.map((x, index) => x * boxes[index]).reduce((sum, x) => sum + x) === 150) {
      result[select.filter(x => x).length - 1]++;
    }
  }

  let part1 = result.reduce((sum, x) => sum + x);
  let part2 = result.filter(x => x).shift();
  return [part1, part2];
}
