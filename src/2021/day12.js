export function part1(input, twice = false) {
  let connections = {};
  input.split("\n").forEach(x => {
    let [src, dest] = x.split("-");
    connections[src] = (connections[src] || []).concat(dest);
    connections[dest] = (connections[dest] || []).concat(src);
  });
  let paths = 0;
  let queue = [{ point: "start", path: ["start"], twice: !twice }];
  while (queue.length > 0) {
    let next = queue.shift();
    if (next.point === "end") {
      paths++;
    } else {
      let neighbors = connections[next.point].filter(p => p !== "start");
      neighbors.forEach(point => {
        if (point.toLowerCase() !== point || !next.path.includes(point)) {
          queue.push({ point, path: [...next.path, point], twice: next.twice });
        } else if (!next.twice) {
          queue.push({ point, path: [...next.path, point], twice: true });
        }
      });
    }
  }
  return paths;
}

export function part2(input) {
  return part1(input, true);
}
