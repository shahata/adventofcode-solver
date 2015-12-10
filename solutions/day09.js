/* global console */
'use strict';

export function day9(input) {
  function shortest(graph, curr, visited) {
    let paths = Object.keys(graph[curr])
                      .filter(node => visited.indexOf(node) === -1)
                      .map(node => graph[curr][node] + shortest(graph, node, visited.concat(curr)));
    return paths.length ? Math.min.apply(Math, paths) : 0;
  }

  let graph = input.split('\n')
                   .map(x => x.match(/^(.*) to (.*) = (\d+)$/).slice(1))
                   .map(x => ({p1: x[0], p2: x[1], distance: parseInt(x[2], 10)}))
                   .reduce((graph, edge) => {
                     graph[edge.p1] = Object.assign({[edge.p2]: edge.distance}, graph[edge.p1]);
                     graph[edge.p2] = Object.assign({[edge.p1]: edge.distance}, graph[edge.p2]);
                     return graph;
                   }, {});
  graph.$$start = Object.keys(graph).reduce((obj, key) => Object.assign({[key]: 0}, obj), {});

  let part1 = shortest(graph, '$$start', []);
  console.log(`Part1: ${part1}`);

  function longest(graph, curr, visited) {
    let paths = Object.keys(graph[curr])
                      .filter(node => visited.indexOf(node) === -1)
                      .map(node => graph[curr][node] + longest(graph, node, visited.concat(curr)));
    return paths.length ? Math.max.apply(Math, paths) : 0;
  }

  let part2 = longest(graph, '$$start', []);
  console.log(`Part2: ${part2}`);
}
