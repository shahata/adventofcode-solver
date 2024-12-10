export function part1(input, part2 = false) {
  let sum = 0;
  const map = input.split("\n").map(line => line.split(""));
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "0") {
        let queue = [{ x, y }];
        let visited = new Set();
        while (queue.length > 0) {
          const { x, y } = queue.shift();
          if (map[y][x] === "9") {
            sum++;
            continue;
          }
          const neighbors = [
            { x: x - 1, y },
            { x: x + 1, y },
            { x, y: y - 1 },
            { x, y: y + 1 },
          ].filter(p => +map[p.y]?.[p.x] === +map[y][x] + 1);
          neighbors.forEach(p => {
            if (!visited.has(`${p.x},${p.y}`) || part2) {
              visited.add(`${p.x},${p.y}`);
              queue.push(p);
            }
          });
        }
      }
    }
  }
  return sum;
}

export function part2(input) {
  return part1(input, true);
}
