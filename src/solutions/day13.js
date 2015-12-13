'use strict';

export function day13(input) {
  function longest(graph, curr, visited) {
    let paths = Object.keys(graph[curr])
                      .filter(node => visited.indexOf(node) === -1)
                      .map(node => graph[curr][node] + longest(graph, node, visited.concat(curr)));
    return paths.length ? Math.max.apply(Math, paths) : graph[curr][visited[0]] || 0;
  }

  let signs = {gain: +1, lose: -1};
  let graph = input.split('\n')
                   .map(x => x.match(/^(.*) would (gain|lose) (\d+) happiness units by sitting next to (.*)\.$/).slice(1))
                   .map(x => ({p1: x[0], p2: x[3], distance: signs[x[1]] * parseInt(x[2], 10)}))
                   .reduce((graph, edge) => {
                     let prev = (graph[edge.p1] && graph[edge.p1][edge.p2]) || 0;
                     graph[edge.p1] = Object.assign({}, graph[edge.p1], {[edge.p2]: edge.distance + prev});
                     graph[edge.p2] = Object.assign({}, graph[edge.p2], {[edge.p1]: edge.distance + prev});
                     return graph;
                   }, {});
  graph.$$me = Object.keys(graph).reduce((obj, key) => Object.assign({[key]: 0}, obj), {});

  let part1 = longest(graph, Object.keys(graph).shift(), []);
  let part2 = longest(graph, '$$me', []);
  return [part1, part2];
}
