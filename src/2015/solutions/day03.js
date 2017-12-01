function day(input) {
  function step(x, y) {
    return pos => ({x: pos.x + x, y: pos.y + y});
  }

  const steps = {
    '<': step(-1, 0),
    '>': step(1, 0),
    '^': step(0, -1),
    v: step(0, 1)
  };

  let part1 = input.split('')
                   .map(x => steps[x])
                   .reduce((state, next) => {
                     const pos = state.pos = next(state.pos);
                     state.visited[`${pos.x}-${pos.y}`] = true;
                     return state;
                   }, {visited: {'0-0': true}, pos: {x: 0, y: 0}});
  part1 = Object.keys(part1.visited).length;

  let part2 = input.split('')
                   .map(x => steps[x])
                   .reduce((state, next, index) => {
                     const turn = index % 2 === 0 ? 'santa' : 'robot';
                     const pos = state.pos[turn] = next(state.pos[turn]);
                     state.visited[`${pos.x}-${pos.y}`] = true;
                     return state;
                   }, {visited: {'0-0': true}, pos: {santa: {x: 0, y: 0}, robot: {x: 0, y: 0}}});
  part2 = Object.keys(part2.visited).length;

  return [part1, part2];
}

module.exports = {day};
