import { lines, sum } from '../utils/commons.js';

function countLights(input, operations) {
  return lines(input)
    .map(x => x.match(/^(.*) (\d+),(\d+) through (\d+),(\d+)$/))
    .map(x => ({
      op: operations[x[1]],
      start: { x: +x[2], y: +x[3] },
      end: { x: +x[4], y: +x[5] },
    }))
    .reduce(
      (state, next) => {
        for (let x = next.start.x; x <= next.end.x; x++) {
          for (let y = next.start.y; y <= next.end.y; y++) {
            state[y][x] = next.op(state[y][x]);
          }
        }
        return state;
      },
      new Array(1000).fill().map(() => new Array(1000).fill(0)),
    )
    .reduce((prev, row) => prev + sum(row), 0);
}

export const part1 = input =>
  countLights(input, {
    'turn on': () => 1,
    'turn off': () => 0,
    'toggle': val => (val === 0 ? 1 : 0),
  });

export const part2 = input =>
  countLights(input, {
    'turn on': val => val + 1,
    'turn off': val => Math.max(val - 1, 0),
    'toggle': val => val + 2,
  });
