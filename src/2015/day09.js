function shortest(graph, curr, visited) {
  let paths = Object.keys(graph[curr])
    .filter(node => visited.indexOf(node) === -1)
    .map(
      node => graph[curr][node] + shortest(graph, node, visited.concat(curr)),
    );
  return paths.length ? Math.min(...paths) : 0;
}

function longest(graph, curr, visited) {
  let paths = Object.keys(graph[curr])
    .filter(node => visited.indexOf(node) === -1)
    .map(
      node => graph[curr][node] + longest(graph, node, visited.concat(curr)),
    );
  return paths.length ? Math.max(...paths) : 0;
}

function parse(input) {
  let graph = input
    .split("\n")
    .map(x => x.match(/^(.*) to (.*) = (\d+)$/))
    .map(([, p1, p2, d]) => ({ p1, p2, d: +d }))
    .reduce((graph, edge) => {
      graph[edge.p1] = { ...graph[edge.p1], [edge.p2]: edge.d };
      graph[edge.p2] = { ...graph[edge.p2], [edge.p1]: edge.d };
      return graph;
    }, {});
  graph.$$start = Object.keys(graph).reduce(
    (obj, key) => ({ [key]: 0, ...obj }),
    {},
  );
  return graph;
}

export function part1(input) {
  return shortest(parse(input), "$$start", []);
}

export function part2(input) {
  return longest(parse(input), "$$start", []);
}
