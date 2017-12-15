const md5 = require('md5');

function getNeighbors(point, [U, D, L, R]) {
  return [
    U && {x: point.x, y: point.y - 1, path: point.path + 'U'},
    D && {x: point.x, y: point.y + 1, path: point.path + 'D'},
    L && {x: point.x - 1, y: point.y, path: point.path + 'L'},
    R && {x: point.x + 1, y: point.y, path: point.path + 'R'}
  ].filter(p => p && p.x >= 0 && p.y >= 0 && p.x <= 3 && p.y <= 3);
}

function solve(input, shortest = true) {
  let queue = [{x: 0, y: 0, path: ''}], max = -1;
  while (queue.length > 0) {
    const next = queue.shift();
    if (next.x === 3 && next.y === 3) {
      if (shortest) {
        return next.path;
      } else {
        max = Math.max(max, next.path.length);
      }
    } else {
      const doors = md5(input + next.path).slice(0, 4).split('').map(x => 'bcdef'.includes(x));
      queue = queue.concat(getNeighbors(next, doors));
    }
  }
  return max;
}

const part1 = input => solve(input, true);
const part2 = input => solve(input, false);
const day = input => [part1(input), part2(input)];

module.exports = {day, part1, part2};
