function turn(direction, count) {
  const compass = { N: 0, E: 90, S: 180, W: 270 };
  const reverse = { 0: 'N', 90: 'E', 180: 'S', 270: 'W' };
  return reverse[(compass[direction] + count) % 360];
}

function turn2(position, count) {
  const rotations = {
    90: ({ x, y }) => ({ x: -1 * y, y: x }),
    180: ({ x, y }) => ({ x: -1 * x, y: -1 * y }),
    270: ({ x, y }) => ({ x: y, y: -1 * x }),
  };
  return rotations[count](position);
}

const operations = {
  N: ({ position: { x, y } }, count) => ({ position: { x, y: y - count } }),
  S: ({ position: { x, y } }, count) => ({ position: { x, y: y + count } }),
  W: ({ position: { x, y } }, count) => ({ position: { x: x - count, y } }),
  E: ({ position: { x, y } }, count) => ({ position: { x: x + count, y } }),
  L: ({ direction }, count) => ({ direction: turn(direction, 360 - count) }),
  R: ({ direction }, count) => ({ direction: turn(direction, count) }),
  F: (state, count) => operations[state.direction](state, count),
};

const operations2 = {
  ...operations,
  L: ({ position }, count) => ({ position: turn2(position, 360 - count) }),
  R: ({ position }, count) => ({ position: turn2(position, count) }),
  F: ({ position, ship }, count) => ({
    ship: {
      x: ship.x + count * position.x,
      y: ship.y + count * position.y,
    },
  }),
};

function solve(input, initial, operations) {
  const steps = input
    .split('\n')
    .map(x => x.match(/^(.)(\d+)$/))
    .map(([, operation, count]) => ({ operation, count: +count }));
  return steps.reduce((state, { operation, count }) => {
    return { ...state, ...operations[operation](state, count) };
  }, initial);
}

export function part1(input) {
  let state = { direction: 'E', position: { x: 0, y: 0 } };
  state = solve(input, state, operations);
  return Math.abs(state.position.x) + Math.abs(state.position.y);
}

export function part2(input) {
  let state = { position: { x: 10, y: -1 }, ship: { x: 0, y: 0 } };
  state = solve(input, state, operations2);
  return Math.abs(state.ship.x) + Math.abs(state.ship.y);
}
