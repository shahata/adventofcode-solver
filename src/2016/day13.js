function isOpen({ x, y }, magicNumber) {
  let num = x * x + 3 * x + 2 * x * y + y + y * y + magicNumber;
  let ones = num
    .toString(2)
    .split("")
    .filter(x => x === "1").length;
  return ones % 2 === 0;
}

function getNeighbors(point) {
  return [
    { x: point.x - 1, y: point.y, distance: point.distance + 1 },
    { x: point.x + 1, y: point.y, distance: point.distance + 1 },
    { x: point.x, y: point.y - 1, distance: point.distance + 1 },
    { x: point.x, y: point.y + 1, distance: point.distance + 1 },
  ].filter(p => p.x >= 0 && p.y >= 0);
}

function cellId({ x, y }) {
  return `${x}-${y}`;
}

function solveMaze(input, source, destination) {
  let magicNumber = +input;
  let queue = [source];
  let maze = { [cellId(source)]: { distance: 0, open: true } };
  while (queue.length) {
    let next = queue.shift();
    if (next.x === destination.x && next.y === destination.y) {
      return maze;
    } else {
      let neighbors = getNeighbors(next).filter(x => !maze[cellId(x)]);
      let distance = maze[cellId(next)].distance + 1;
      neighbors.forEach(
        x => (maze[cellId(x)] = { distance, open: isOpen(x, magicNumber) }),
      );
      queue = queue.concat(neighbors.filter(x => maze[cellId(x)].open));
    }
  }
}

export function part1(input, destination = { x: 31, y: 39 }) {
  let maze = solveMaze(input, { x: 1, y: 1 }, destination);
  return maze[cellId(destination)].distance;
}

export function part2(input, destination = { x: 31, y: 39 }) {
  let maze = solveMaze(input, { x: 1, y: 1 }, destination);
  return Object.values(maze).filter(x => x.distance <= 50 && x.open).length;
}
