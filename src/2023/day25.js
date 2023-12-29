import 'regenerator-runtime';
import { mincut } from '@graph-algorithm/minimum-cut';

function graphSize(graph, component, ignored, visited = new Set()) {
  let result = 1;
  visited.add(component);
  graph[component].forEach(c => {
    if (!visited.has(c) && !ignored[component]?.includes(c)) {
      result += graphSize(graph, c, ignored, visited);
    }
  });
  return result;
}

function toGraph(edges) {
  const graph = {};
  edges.forEach(([a, b]) => {
    graph[a] = (graph[a] || []).concat(b);
    graph[b] = (graph[b] || []).concat(a);
  });
  return graph;
}

export function part1(input) {
  const edges = [];
  input.split('\n').forEach(line => {
    let [component, connections] = line.split(': ');
    connections = connections.split(' ');
    connections.forEach(connection => edges.push([component, connection]));
  });
  const graph = toGraph(edges);
  const ignored = toGraph([...mincut(edges)]);
  const size = graphSize(graph, Object.keys(graph)[0], {});
  const x = graphSize(graph, Object.keys(graph)[0], ignored);
  return x * (size - x);
}

export const part2 = () => undefined;
