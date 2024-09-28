import { combinations } from 'combinatorial-generators';

function parse(input) {
  const targets = [];
  const maze = input.split('\n').map((line, y) =>
    line.split('').map((c, x) => {
      if (c === '#') {
        return { x, y, wall: true };
      } else if (c === '.') {
        return { x, y, wall: false };
      } else {
        const point = { x, y, wall: false, target: +c };
        targets.push(point);
        return point;
      }
    }),
  );
  return { maze, targets };
}

function getNeighbors(maze, point, props) {
  const { x, y } = point;
  return [
    { ...props, point: maze[y][x - 1] },
    { ...props, point: maze[y][x + 1] },
    { ...props, point: maze[y - 1][x] },
    { ...props, point: maze[y + 1][x] },
  ].filter(x => !x.point.wall);
}

function path(maze, source, destination) {
  const visited = new Set().add(source);
  let queue = [{ distance: 0, point: source }];
  while (queue.length) {
    const { distance, point } = queue.shift();
    const neighbors = getNeighbors(maze, point, {
      distance: distance + 1,
    }).filter(({ point }) => !visited.has(point));
    neighbors.forEach(({ point }) => visited.add(point));
    if (visited.has(destination)) {
      return distance + 1;
    }
    queue = queue.concat(neighbors);
  }
}

function solve({ maze, targets }, andBack) {
  const back = {};
  const paths = [...combinations(targets, 2)].map(([source, destination]) => {
    const distance = path(maze, source, destination);
    if (source.target === 0 || destination.target === 0) {
      back[source.target + destination.target] = distance;
    }
    return { points: [source.target, destination.target], distance };
  });

  const options = [...combinations(paths, targets.length - 1)]
    .map(option => {
      const points = option.reduce((points, path) => {
        points[path.points[0]] = (points[path.points[0]] || []).concat([
          path.points[1],
        ]);
        points[path.points[1]] = (points[path.points[1]] || []).concat([
          path.points[0],
        ]);
        return points;
      }, {});
      const state = { current: 0, visited: new Set().add(0) };
      while (points[state.current] && points[state.current].length === 1) {
        const prev = state.current;
        state.current = points[state.current].shift();
        points[state.current] = points[state.current].filter(x => x !== prev);
        state.visited.add(state.current);
      }
      return (
        state.visited.size === targets.length && {
          length: option.reduce(
            (distance, path) => distance + path.distance,
            0,
          ),
          back: back[state.current],
        }
      );
    })
    .filter(x => x);

  return options.reduce((shortest, option) => {
    return Math.min(
      shortest,
      andBack ? option.length + option.back : option.length,
    );
  }, Infinity);
}

export function part1(input) {
  return solve(parse(input), false);
}

export function part2(input) {
  return solve(parse(input), true);
}
