function countLights(input, operations) {
  return input.split('\n')
              .map(x => x.match(/^(.*) (\d+),(\d+) through (\d+),(\d+)$/))
              .map(x => ({
                op: operations[x[1]],
                start: {x: parseInt(x[2], 10), y: parseInt(x[3], 10)},
                end: {x: parseInt(x[4], 10), y: parseInt(x[5], 10)}
              }))
              .reduce((state, next) => {
                for (let x = next.start.x; x <= next.end.x; x++) {
                  for (let y = next.start.y; y <= next.end.y; y++) {
                    state[y][x] = next.op(state[y][x]);
                  }
                }
                return state;
              }, new Array(1000).fill(undefined).map(() => new Array(1000).fill(0)))
              .reduce((sum, row) => sum + row.reduce((sum, x) => sum + x), 0);
}

const part1 = input => countLights(input, {
  'turn on': () => 1,
  'turn off': () => 0,
  toggle: val => val === 0 ? 1 : 0
});

const part2 = input => countLights(input, {
  'turn on': val => val + 1,
  'turn off': val => Math.max(val - 1, 0),
  toggle: val => val + 2
});

const day = input => [part1(input), part2(input)];

module.exports = {day, part1, part2};
