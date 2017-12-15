function step({x, y}, direction) {
  switch (direction) {
    case 's': return {x: x + 0, y: y - 2};
    case 'n': return {x: x + 0, y: y + 2};
    case 'w': return {x: x - 2, y: y + 0};
    case 'e': return {x: x + 2, y: y + 0};
    case 'sw': return {x: x - 1, y: y - 1};
    case 'se': return {x: x + 1, y: y - 1};
    case 'nw': return {x: x - 1, y: y + 1};
    case 'ne': return {x: x + 1, y: y + 1};
    default:
  }
}

function parse(input) {
  return input.split(',').reduce(step, {x: 0, y: 0});
}

function parse2(input) {
  return input.split(',').reduce(({furthest, point}, direction) => {
    return {furthest: Math.max(furthest, distance(step(point, direction))), point: step(point, direction)};
  }, {furthest: 0, point: {x: 0, y: 0}});
}

function distance({x, y}) {
  const diagonal = Math.min(Math.abs(x), Math.abs(y));
  const straight = (Math.max(Math.abs(x), Math.abs(y)) - diagonal) / 2;
  return diagonal + straight;
}

function day(input) {
  const part1 = distance(parse(input));
  const part2 = parse2(input).furthest;
  return [part1, part2];
}

module.exports = {day};
