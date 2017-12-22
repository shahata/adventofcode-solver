function shortest(graph, curr, visited) {
  const paths = Object.keys(graph[curr])
                      .filter(node => visited.indexOf(node) === -1)
                      .map(node => graph[curr][node] + shortest(graph, node, visited.concat(curr)));
  return paths.length ? Math.min.apply(Math, paths) : 0;
}

function longest(graph, curr, visited) {
  const paths = Object.keys(graph[curr])
                      .filter(node => visited.indexOf(node) === -1)
                      .map(node => graph[curr][node] + longest(graph, node, visited.concat(curr)));
  return paths.length ? Math.max.apply(Math, paths) : 0;
}

function parse(input) {
  const graph = input.split('\n')
                     .map(x => x.match(/^(.*) to (.*) = (\d+)$/))
                     .map(x => ({p1: x[1], p2: x[2], d: parseInt(x[3], 10)}))
                     .reduce((graph, edge) => {
                       graph[edge.p1] = Object.assign({}, graph[edge.p1], {[edge.p2]: edge.d});
                       graph[edge.p2] = Object.assign({}, graph[edge.p2], {[edge.p1]: edge.d});
                       return graph;
                     }, {});
  graph.$$start = Object.keys(graph).reduce((obj, key) => Object.assign({[key]: 0}, obj), {});
  return graph;
}

const part1 = input => shortest(parse(input), '$$start', []);
const part2 = input => longest(parse(input), '$$start', []);

module.exports = {part1, part2};
