function solve(maze, mutate) {
  let current = 0;
  let steps = 0;
  while (maze[current] !== undefined) {
    const prev = maze[current];
    maze[current] = mutate(maze[current]);
    current += prev;
    steps++;
  }
  return steps;
}
function day(input) {
  const maze = input.split('\n').map(x => parseInt(x, 10));
  const part1 = solve(maze.slice(0), x => x + 1);
  const part2 = solve(maze.slice(0), x => x >= 3 ? x - 1 : x + 1);
  return [part1, part2];
}

module.exports = {day};
