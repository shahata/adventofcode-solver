import { lines } from '../utils/commons.js';

function parse(input) {
  return lines(input).reduce((obj, line) => {
    const [key, neighbors] = line.split(' <-> ');
    return { ...obj, [key]: neighbors.split(', ') };
  }, {});
}

function count(graph, key, visited = new Set()) {
  visited.add(key);
  graph[key]
    .filter(x => !visited.has(x))
    .forEach(x => count(graph, x, visited));
  return visited;
}

function countGroups(graph) {
  let groups = 0;
  const visited = new Set();
  Object.keys(graph).forEach(x => {
    if (!visited.has(x)) {
      groups++;
      count(graph, x, visited);
    }
  });
  return groups;
}

export const part1 = input => count(parse(input), '0').size;
export const part2 = input => countGroups(parse(input));
