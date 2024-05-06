import 'regenerator-runtime';
import { mincut } from '@graph-algorithm/minimum-cut';

function graphSize(graph, ignored, visited = new Set()) {
  const queue = [Object.keys(graph)[0]];
  while (queue.length > 0) {
    const component = queue.shift();
    visited.add(component);
    graph[component].forEach(c => {
      if (!visited.has(c) && !ignored[component]?.includes(c)) queue.push(c);
    });
  }
  return visited.size;
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
  const size = graphSize(graph, {});
  const x = graphSize(graph, ignored);
  return x * (size - x);
}

export function part2() {
  return undefined;
}
