function turnLeft(direction) {
  switch (direction) {
    case 'U': return 'L';
    case 'D': return 'R';
    case 'L': return 'D';
    case 'R': return 'U';
    default:
  }
}

function turnRight(direction) {
  switch (direction) {
    case 'U': return 'R';
    case 'D': return 'L';
    case 'L': return 'U';
    case 'R': return 'D';
    default:
  }
}

function turnBackward(direction) {
  switch (direction) {
    case 'U': return 'D';
    case 'D': return 'U';
    case 'L': return 'R';
    case 'R': return 'L';
    default:
  }
}

function turn(state) {
  const node = state.nodes[toKey(state.position)];
  switch (node) {
    case '#': return turnRight(state.direction);
    case 'W': return state.direction;
    case 'F': return turnBackward(state.direction);
    default: return turnLeft(state.direction);
  }
}

function next(node, evolved) {
  switch (node) {
    case '#': return evolved ? 'F' : '.';
    case 'W': return '#';
    case 'F': return '.';
    default: return evolved ? 'W' : '#';
  }
}

function move({x, y}, direction) {
  switch (direction) {
    case 'U': return {x, y: y - 1};
    case 'D': return {x, y: y + 1};
    case 'L': return {x: x - 1, y};
    case 'R': return {x: x + 1, y};
    default:
  }
}

function toKey({x, y}) {
  return `${x}:${y}`;
}

function burst(state, evolved) {
  state.direction = turn(state);
  state.nodes[toKey(state.position)] = next(state.nodes[toKey(state.position)], evolved);
  state.infections += state.nodes[toKey(state.position)] === '#' ? 1 : 0;
  state.position = move(state.position, state.direction);
}

function parse(input) {
  const nodes = {};
  const lines = input.split('\n');
  const position = {x: (lines[0].length - 1) / 2, y: (lines.length - 1) / 2};
  lines.forEach((line, y) => line.split('').forEach((node, x) => nodes[toKey({x, y})] = node));
  return {nodes, position};
}

function part1(input, bursts = 10000, evolved = false) {
  const {nodes, position} = parse(input);
  const state = {nodes, position, direction: 'U', infections: 0};
  for (let i = 0; i < bursts; i++) {
    burst(state, evolved);
  }
  return state.infections;
}

function part2(input, bursts = 10000000) {
  return part1(input, bursts, true);
}

module.exports = {part1, part2};
