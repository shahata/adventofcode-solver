export function part1(input) {
  let start = { x: 0, y: 0, e: 0 },
    end = { x: 0, y: 0, e: 0 };
  let maze = input.split("\n").map((line, y) =>
    line.split("").map((cell, x) => {
      if (cell === "S") return (start = { x, y, e: "a".charCodeAt(0) });
      else if (cell === "E") return (end = { x, y, e: "z".charCodeAt(0) });
      else return { x, y, e: cell.charCodeAt(0) };
    }),
  );
  let queue = [{ ...start, steps: 0 }];
  let visited = new Set(`${start.x},${start.y}}`);
  while (queue.length > 0) {
    let current = queue.shift();
    if (current.x === end.x && current.y === end.y) return current.steps;
    let neighbors = [
      maze[current.y - 1] && maze[current.y - 1][current.x],
      maze[current.y + 1] && maze[current.y + 1][current.x],
      maze[current.y][current.x - 1],
      maze[current.y][current.x + 1],
    ]
      .filter(cell => cell && !visited.has(`${cell.x},${cell.y}`))
      .filter(cell => cell.e - current.e <= 1)
      .map(cell => ({ ...cell, steps: current.steps + 1 }));
    neighbors.forEach(cell => visited.add(`${cell.x},${cell.y}`));
    queue.push(...neighbors);
  }
  return Infinity;
}

export function part2(input) {
  let str = input.replace("S", "a");
  let min = Infinity;
  for (let { index } of str.matchAll(/a/g)) {
    let result = part1(`${str.slice(0, index)}S${str.slice(index + 1)}`);
    min = result < min ? result : min;
  }
  return min;
}
