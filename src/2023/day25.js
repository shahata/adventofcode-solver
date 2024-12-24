import "regenerator-runtime";
import { mincut } from "@graph-algorithm/minimum-cut";

function graphSize(graph, ignored, visited = new Set()) {
  let queue = [Object.keys(graph)[0]];
  while (queue.length > 0) {
    let component = queue.shift();
    visited.add(component);
    graph[component].forEach(c => {
      if (!visited.has(c) && !ignored[component]?.includes(c)) queue.push(c);
    });
  }
  return visited.size;
}

function toGraph(edges) {
  let graph = {};
  edges.forEach(([a, b]) => {
    graph[a] = (graph[a] || []).concat(b);
    graph[b] = (graph[b] || []).concat(a);
  });
  return graph;
}

export function part1(input) {
  let edges = [];
  input.split("\n").forEach(line => {
    let [component, connections] = line.split(": ");
    connections = connections.split(" ");
    connections.forEach(connection => edges.push([component, connection]));
  });
  let graph = toGraph(edges);
  let ignored = toGraph([...mincut(edges)]);
  let size = graphSize(graph, {});
  let x = graphSize(graph, ignored);
  return x * (size - x);
}

export function part2() {
  return undefined;
}
