function parse(input) {
  return input.split('\n').reduce((obj, line) => {
    const [key, neighbors] = line.split(' <-> ');
    return Object.assign({[key]: neighbors.split(', ')}, obj);
  }, {});
}

function count(graph, key, visited = new Set()) {
  visited.add(key);
  graph[key].filter(x => !visited.has(x)).forEach(x => count(graph, x, visited));
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

function day(input) {
  const graph = parse(input);
  const part1 = count(graph, '0').size;
  const part2 = countGroups(graph);
  return [part1, part2];
}

module.exports = {day};
