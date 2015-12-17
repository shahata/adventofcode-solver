'use strict';

export function day17(input) {
  let containers = input.split('\n').map(x => parseInt(x, 10));
  let result = new Array(containers.length).fill(0);
  let pad = result.join('');

  for (let i = Math.pow(2, containers.length) - 1; i > 0; i--) {
    let select = (pad + i.toString(2)).slice(-containers.length).split('').map(x => parseInt(x, 10));
    if (select.map((x, index) => x * containers[index]).reduce((sum, x) => sum + x) === 150) {
      result[select.filter(x => x).length - 1]++;
    }
  }

  let part1 = result.reduce((sum, x) => sum + x);
  let part2 = result.filter(x => x).shift();
  return [part1, part2];
}
