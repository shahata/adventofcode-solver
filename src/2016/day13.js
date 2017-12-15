function isOpen({x, y}, magicNumber) {
  const num = (x * x) + (3 * x) + (2 * x * y) + y + (y * y) + magicNumber;
  return num.toString(2).split('').filter(x => x === '1').length % 2 === 0;
}

function getNeighbors(point) {
  return [
    {x: point.x - 1, y: point.y, distance: point.distance + 1},
    {x: point.x + 1, y: point.y, distance: point.distance + 1},
    {x: point.x, y: point.y - 1, distance: point.distance + 1},
    {x: point.x, y: point.y + 1, distance: point.distance + 1}
  ].filter(p => p.x >= 0 && p.y >= 0);
}

function cellId({x, y}) {
  return `${x}-${y}`;
}

function solveMaze(magicNumber, source, destination) {
  let queue = [source];
  const maze = {[cellId(source)]: {distance: 0, open: true}};
  while (queue.length) {
    const next = queue.shift();
    if (next.x === destination.x && next.y === destination.y) {
      return maze;
    } else {
      const neighbors = getNeighbors(next).filter(x => !maze[cellId(x)]);
      const distance = maze[cellId(next)].distance + 1;
      neighbors.forEach(x => maze[cellId(x)] = {distance, open: isOpen(x, magicNumber)});
      queue = queue.concat(neighbors.filter(x => maze[cellId(x)].open));
    }
  }
}

function day(input, destination = {x: 31, y: 39}) {
  const magicNumber = parseInt(input, 10);
  const maze = solveMaze(magicNumber, {x: 1, y: 1}, destination);
  const part1 = maze[cellId(destination)].distance;
  const part2 = Object.values(maze).filter(x => x.distance <= 50 && x.open).length;
  return [part1, part2];
}

module.exports = {day};
