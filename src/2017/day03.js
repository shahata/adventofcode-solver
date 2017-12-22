function solve1(destination) {
  let radius = 0;
  let multiplier = 0;
  while ((8 * multiplier) + 1 < destination) {
    radius++;
    multiplier += radius;
  }
  const bottomRight = (8 * multiplier) + 1;
  const bottomLeft = bottomRight - (radius * 2);
  const topLeft = bottomLeft - (radius * 2);
  const topRight = topLeft - (radius * 2);
  const fromCorner = Math.min(Math.abs(topRight - destination), Math.abs(bottomLeft - destination));
  return (radius * 2) - Math.min(fromCorner, (radius * 2) - fromCorner);
}

function toKey({x, y}) {
  return `${x}-${y}`;
}

function next({position, direction}) {
  const {x, y} = position;
  switch (direction) {
    case 'R': return {x: x + 1, y};
    case 'L': return {x: x - 1, y};
    case 'U': return {x, y: y - 1};
    case 'D': return {x, y: y + 1};
    default:
  }
}

function calc({position, map}) {
  const {x, y} = position;
  return [
    map[toKey({x: x - 1, y: y - 1})] || 0,
    map[toKey({x: x + 0, y: y - 1})] || 0,
    map[toKey({x: x + 1, y: y - 1})] || 0,
    map[toKey({x: x - 1, y: y + 0})] || 0,
    map[toKey({x: x + 1, y: y + 0})] || 0,
    map[toKey({x: x - 1, y: y + 1})] || 0,
    map[toKey({x: x + 0, y: y + 1})] || 0,
    map[toKey({x: x + 1, y: y + 1})] || 0
  ].reduce((sum, x) => sum + x);
}

function direction({position, direction, map}) {
  switch (direction) {
    case 'R': return map[toKey(next({position, direction: 'U'}))] ? direction : 'U';
    case 'L': return map[toKey(next({position, direction: 'D'}))] ? direction : 'D';
    case 'U': return map[toKey(next({position, direction: 'L'}))] ? direction : 'L';
    case 'D': return map[toKey(next({position, direction: 'R'}))] ? direction : 'R';
    default:
  }
}

function solve2(destination) {
  const state = {position: {x: 0, y: 0}, direction: 'R', map: {[toKey({x: 0, y: 0})]: 1}};
  let current = 1;
  while (current <= destination) {
    state.position = next(state);
    current = state.map[toKey(state.position)] = calc(state);
    state.direction = direction(state);
  }
  return current;
}

const part1 = input => solve1(parseInt(input, 10));
const part2 = input => solve2(parseInt(input, 10));

module.exports = {part1, part2};
