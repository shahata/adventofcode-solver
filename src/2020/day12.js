function turn(direction, count) {
  const compass = { N: 0, E: 90, S: 180, W: 270 };
  const reverse = { 0: 'N', 90: 'E', 180: 'S', 270: 'W' };
  return reverse[(compass[direction] + count) % 360];
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

export function part1(input) {
  let state = { direction: 'E', position: { x: 0, y: 0 } };
  const steps = input
    .split('\n')
    .map(x => x.match(/^(.)(\d+)$/))
    .map(([, step, count]) => ({ step, count: +count }));
  steps.forEach(({ step, count }) => {
    state = { ...state, ...operations[step](state, count) };
  });
  return Math.abs(state.position.x) + Math.abs(state.position.y);
}

function turn2(waypoint, count) {
  const rotations = {
    90: ({ x, y }) => ({ x: -1 * y, y: x }),
    180: ({ x, y }) => ({ x: -1 * x, y: -1 * y }),
    270: ({ x, y }) => ({ x: y, y: -1 * x }),
  };
  return rotations[count](waypoint);
}

const operations2 = {
  N: ({ waypoint: { x, y } }, count) => ({ waypoint: { x, y: y - count } }),
  S: ({ waypoint: { x, y } }, count) => ({ waypoint: { x, y: y + count } }),
  W: ({ waypoint: { x, y } }, count) => ({ waypoint: { x: x - count, y } }),
  E: ({ waypoint: { x, y } }, count) => ({ waypoint: { x: x + count, y } }),
  L: ({ waypoint }, count) => ({ waypoint: turn2(waypoint, 360 - count) }),
  R: ({ waypoint }, count) => ({ waypoint: turn2(waypoint, count) }),
  F: ({ position, waypoint }, count) => ({
    position: {
      x: position.x + count * waypoint.x,
      y: position.y + count * waypoint.y,
    },
  }),
};
export function part2(input) {
  let state = { waypoint: { x: 10, y: -1 }, position: { x: 0, y: 0 } };
  const steps = input
    .split('\n')
    .map(x => x.match(/^(.)(\d+)$/))
    .map(([, step, count]) => ({ step, count: +count }));
  steps.forEach(({ step, count }) => {
    state = { ...state, ...operations2[step](state, count) };
  });
  return Math.abs(state.position.x) + Math.abs(state.position.y);
}
