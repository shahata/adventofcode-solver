const turnLeft = {
  U: 'L',
  D: 'R',
  L: 'D',
  R: 'U',
};

const turnRight = {
  U: 'R',
  D: 'L',
  L: 'U',
  R: 'D',
};

const turnBackward = {
  U: 'D',
  D: 'U',
  L: 'R',
  R: 'L',
};

function turn(state) {
  const node = state.nodes[toKey(state.position)];
  switch (node) {
    case '#':
      return turnRight[state.direction];
    case 'W':
      return state.direction;
    case 'F':
      return turnBackward[state.direction];
    default:
      return turnLeft[state.direction];
  }
}

function next(node, evolved) {
  switch (node) {
    case '#':
      return evolved ? 'F' : '.';
    case 'W':
      return '#';
    case 'F':
      return '.';
    default:
      return evolved ? 'W' : '#';
  }
}

function move({ x, y }, direction) {
  const directions = {
    U: { x, y: y - 1 },
    D: { x, y: y + 1 },
    L: { x: x - 1, y },
    R: { x: x + 1, y },
  };
  return directions[direction];
}

function toKey({ x, y }) {
  return `${x}:${y}`;
}

function burst(state, evolved) {
  state.direction = turn(state);
  state.nodes[toKey(state.position)] = next(
    state.nodes[toKey(state.position)],
    evolved,
  );
  state.infections += state.nodes[toKey(state.position)] === '#' ? 1 : 0;
  state.position = move(state.position, state.direction);
}

function parse(input) {
  const nodes = {};
  const lines = input.split('\n');
  const position = { x: (lines[0].length - 1) / 2, y: (lines.length - 1) / 2 };
  lines.forEach((line, y) =>
    line.split('').forEach((node, x) => (nodes[toKey({ x, y })] = node)),
  );
  return { nodes, position };
}

export function part1(input, bursts = 1e4, evolved = false) {
  const { nodes, position } = parse(input);
  const state = { nodes, position, direction: 'U', infections: 0 };
  for (let i = 0; i < bursts; i++) {
    burst(state, evolved);
  }
  return state.infections;
}

export function part2(input, bursts = 1e7) {
  return part1(input, bursts, true);
}
