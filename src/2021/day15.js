import { PriorityQueue } from "@datastructures-js/priority-queue";

function neighbors({ x, y, risk }, maze) {
  return [
    { x, y: y - 1, risk: maze[y - 1] && maze[y - 1][x + 0] },
    { x: x - 1, y, risk: maze[y + 0] && maze[y + 0][x - 1] },
    { x: x + 1, y, risk: maze[y + 0] && maze[y + 0][x + 1] },
    { x, y: y + 1, risk: maze[y + 1] && maze[y + 1][x + 0] },
  ]
    .filter(x => x.risk !== undefined)
    .map(p => ({ x: p.x, y: p.y, risk: risk + p.risk }));
}

function solve(maze) {
  let visited = new Map();
  let queue = new PriorityQueue(
    (a, b) => a.risk - b.risk,
    [{ x: 0, y: 0, risk: 0 }],
  );
  while (queue.size() > 0) {
    let n = queue.dequeue();
    if (n.x === maze[0].length - 1 && n.y === maze.length - 1) {
      return n.risk;
    }
    neighbors(n, maze).forEach(neighbor => {
      let v = visited.get(`${neighbor.x},${neighbor.y}`);
      if (!v || neighbor.risk < v.risk) {
        if (v) queue.remove(x => x === v);
        visited.set(`${neighbor.x},${neighbor.y}`, neighbor);
        queue.enqueue(neighbor);
      }
    });
  }
}

export function part1(input) {
  let maze = input.split("\n").map(line => line.split("").map(risk => +risk));
  return solve(maze);
}

export function part2(input) {
  let maze = input.split("\n").map(line => line.split("").map(risk => +risk));
  let inc = (line, i) => line.map(n => (n + i > 9 ? n + i - 9 : n + i));
  let dup = (maze, i) => maze.map(line => inc(line, i));
  maze = maze.map(l => l.concat(inc(l, 1), inc(l, 2), inc(l, 3), inc(l, 4)));
  maze = maze.concat(dup(maze, 1), dup(maze, 2), dup(maze, 3), dup(maze, 4));
  return solve(maze);
}
