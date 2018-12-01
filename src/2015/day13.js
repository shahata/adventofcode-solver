function longest(graph, curr, visited) {
  const paths = Object.keys(graph[curr])
    .filter(node => visited.indexOf(node) === -1)
    .map(
      node => graph[curr][node] + longest(graph, node, visited.concat(curr)),
    );
  return paths.length
    ? Math.max.apply(Math, paths)
    : graph[curr][visited[0]] || 0;
}

function parse(input) {
  const signs = { gain: +1, lose: -1 };
  const graph = input
    .split('\n')
    .map(x =>
      x.match(/^(.*) would (gain|lose) (\d+) happiness .* next to (.*)\.$/),
    )
    .map(x => ({ p1: x[1], p2: x[4], d: signs[x[2]] * parseInt(x[3], 10) }))
    .reduce((graph, edge) => {
      const prev = (graph[edge.p1] && graph[edge.p1][edge.p2]) || 0;
      graph[edge.p1] = Object.assign({}, graph[edge.p1], {
        [edge.p2]: edge.d + prev,
      });
      graph[edge.p2] = Object.assign({}, graph[edge.p2], {
        [edge.p1]: edge.d + prev,
      });
      return graph;
    }, {});
  graph.$$me = Object.keys(graph).reduce(
    (obj, key) => Object.assign({ [key]: 0 }, obj),
    {},
  );
  return graph;
}

function part1(input) {
  const graph = parse(input);
  return longest(graph, Object.keys(graph).shift(), []);
}

function part2(input) {
  const graph = parse(input);
  return longest(graph, '$$me', []);
}

module.exports = { part1, part2 };
