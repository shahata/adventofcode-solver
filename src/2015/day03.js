function step(x, y) {
  return pos => ({x: pos.x + x, y: pos.y + y});
}

const steps = {
  '<': step(-1, 0),
  '>': step(1, 0),
  '^': step(0, -1),
  v: step(0, 1)
};

function parse(input) {
  return input.split('').map(x => steps[x]);
}

function part1(input) {
  return parse(input).reduce((state, next) => {
    const pos = state.pos = next(state.pos);
    state.visited.add(`${pos.x}-${pos.y}`);
    return state;
  }, {visited: new Set().add('0-0'), pos: {x: 0, y: 0}}).visited.size;
}

function part2(input) {
  return parse(input).reduce((state, next, index) => {
    const turn = index % 2 === 0 ? 'santa' : 'robot';
    const pos = state.pos[turn] = next(state.pos[turn]);
    state.visited.add(`${pos.x}-${pos.y}`);
    return state;
  }, {visited: new Set().add('0-0'), pos: {santa: {x: 0, y: 0}, robot: {x: 0, y: 0}}}).visited.size;
}

module.exports = {part1, part2};
