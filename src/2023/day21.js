function solve(input, steps, infinite) {
  let map = input.split("\n").map(line => line.split(""));
  let start;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === "S") {
        start = { x, y, steps: 0 };
      }
    }
  }
  let t = [];
  let visited = new Map([[`${start.x},${start.y}`, start]]);
  let max = steps > 5000 ? map.length * 2 + (steps % map.length) : steps;
  for (let i = 1; i <= max; i++) {
    let next = new Map();
    for (let { x, y } of visited.values()) {
      let neighbors = [
        { x: x - 1, y },
        { x: x + 1, y },
        { x, y: y - 1 },
        { x, y: y + 1 },
      ].filter(n => {
        return infinite
          ? map.at(n.y % map.length).at(n.x % map[0].length) !== "#"
          : map[n.y]?.[n.x] && map[n.y][n.x] !== "#";
      });
      neighbors.forEach(n => next.set(`${n.x},${n.y}`, n));
    }
    visited = next;
    if (i === steps) return visited.size;
    if (i % map.length === steps % map.length) t.push(visited.size);
  }

  // 1. 0^2*a + 0*b + c = t[0]
  // 2. 1^2*a + 1*b + c = t[1]
  // 3. 2^2*a + 2*b + c = t[2]
  //
  // 1. 0 + 0 + c = t[0]
  // 2. a + b + c = t[1]
  // 3. 4a + 2b + c = t[2]
  //
  // 1. c = t[0]
  // 2. b = t[1] - c - a
  // 3. 4a + 2b = t[2] - c
  // 3. 2a + 2(t[1] - c) = t[2] - c
  // 3. 2a = t[2] - 2t[1] + c
  // 3. a = (t[2] + c)/2 - t[1]
  //
  // 3. a = (t[2] + t[0])/2 - t[1]
  // 2. b = t[1] - t[0] - a
  // 1. c = t[0]

  let a = (t[2] + t[0]) / 2 - t[1];
  let b = t[1] - t[0] - a;
  let c = t[0];
  let x = Math.floor(steps / map.length);
  return a * x * x + b * x + c;
}

export function part1(input, steps = 64) {
  return solve(input, steps, false);
}

export function part2(input, steps = 26501365) {
  return solve(input, steps, true);
}
