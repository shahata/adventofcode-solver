/* global console */
'use strict';

export function day6(input) {
  let operation1 = {
    'turn on': () => true,
    'turn off': () => false,
    'toggle': val => !val
  };

  let part1 = input.split('\n')
                   .map(x => x.match(/^(.*) (\d+),(\d+) through (\d+),(\d+)$/).slice(1))
                   .map(x => ({
                      op: operation1[x[0]],
                      start: {x: parseInt(x[1], 10), y: parseInt(x[2], 10)},
                      end: {x: parseInt(x[3], 10), y: parseInt(x[4], 10)}
                    }))
                   .reduce((state, next) => {
                     for (let x = next.start.x; x <= next.end.x; x++) {
                       for (let y = next.start.y; y <= next.end.y; y++) {
                         state[y][x] = next.op(state[y][x]);
                       }
                     }
                     return state;
                   }, new Array(1000).fill(undefined).map(() => new Array(1000).fill(false)))
                   .reduce((sum, row) => sum + row.filter(x => x).length, 0);
  console.log(`Part1: ${part1}`);

  let operation2 = {
    'turn on': val => val + 1,
    'turn off': val => val === 0 ? 0 : val - 1,
    'toggle': val => val + 2
  };

  let part2 = input.split('\n')
                   .map(x => x.match(/^(.*) (\d+),(\d+) through (\d+),(\d+)$/).slice(1))
                   .map(x => ({
                      op: operation2[x[0]],
                      start: {x: parseInt(x[1], 10), y: parseInt(x[2], 10)},
                      end: {x: parseInt(x[3], 10), y: parseInt(x[4], 10)}
                    }))
                   .reduce((state, next) => {
                     for (let x = next.start.x; x <= next.end.x; x++) {
                       for (let y = next.start.y; y <= next.end.y; y++) {
                         state[y][x] = next.op(state[y][x]);
                       }
                     }
                     return state;
                   }, new Array(1000).fill(undefined).map(() => new Array(1000).fill(0)))
                   .reduce((sum, row) => sum + row.reduce((sum, x) => sum + x, 0), 0);
  console.log(`Part2: ${part2}`);
}
