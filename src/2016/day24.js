const Combinatorics = require('js-combinatorics');

function parse(input) {
  let source;
  const targets = [];
  const maze = input.split('\n').map((line, y) => line.split('').map((c, x) => {
    if (c === '#') {
      return {x, y, wall: true};
    } else if (c === '.') {
      return {x, y, wall: false};
    } else if (c === '0') {
      return source = {x, y, wall: false, target: 0};
    } else {
      const point = {x, y, wall: false, target: parseInt(c, 10)};
      targets.push(point);
      return point;
    }
  }));
  return {source, maze, targets};
}

function getNeighbors(maze, point, props) {
  const {x, y} = point;
  return [
    Object.assign({point: maze[y][x - 1]}, props),
    Object.assign({point: maze[y][x + 1]}, props),
    Object.assign({point: maze[y - 1][x]}, props),
    Object.assign({point: maze[y + 1][x]}, props)
  ].filter(x => !x.point.wall);
}

function path(maze, source, destination) {
  const visited = new Set().add(source);
  let queue = [{distance: 0, point: source}];
  while (queue.length) {
    const {distance, point} = queue.shift();
    const neighbors = getNeighbors(maze, point, {distance: distance + 1}).filter(({point}) => !visited.has(point));
    neighbors.forEach(({point}) => visited.add(point));
    if (visited.has(destination)) {
      return distance + 1;
    }
    queue = queue.concat(neighbors);
  }
}

function solve({maze, source, targets}, andBack) {
  const back = {};
  const paths = Combinatorics.combination(targets.concat([source]), 2).toArray().map(([source, destination]) => {
    const distance = path(maze, source, destination);
    if (source.target === 0 || destination.target === 0) {
      back[source.target + destination.target] = distance;
    }
    return {points: [source, destination], distance};
  });

  const options = Combinatorics.combination(paths, targets.length).filter(option => {
    const points = option.reduce((points, path) => {
      points[path.points[0].target] = (points[path.points[0].target] || []).concat([path.points[1].target]);
      points[path.points[1].target] = (points[path.points[1].target] || []).concat([path.points[0].target]);
      return points;
    }, {});
    const state = {current: 0, prev: 0, visited: new Set().add(0)};
    while (points[state.current] !== undefined && points[state.current].length > 0) {
      points[state.current] = points[state.current].filter(x => x !== state.prev);
      state.prev = state.current;
      state.current = points[state.current].shift();
      if (state.current !== undefined) {
        state.visited.add(state.current);
      }
    }
    if (state.visited.size === targets.length + 1) {
      option.back = back[state.prev];
    }
    return !!option.back;
  });

  return options.reduce((shortest, option) => {
    const length = option.reduce((distance, path) => distance + path.distance, 0);
    return Math.min(shortest, length + (andBack ? option.back : 0));
  }, Infinity);
}

const part1 = input => solve(parse(input), false);
const part2 = input => solve(parse(input), true);

module.exports = {part1, part2};
