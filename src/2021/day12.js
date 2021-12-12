export function part1(input, twice = false) {
  const connections = {};
  input.split('\n').forEach(x => {
    const [src, dest] = x.split('-');
    connections[src] = (connections[src] || []).concat(dest);
    connections[dest] = (connections[dest] || []).concat(src);
  });
  let paths = 0;
  const queue = [{ point: 'start', path: ['start'], twice: !twice }];
  while (queue.length > 0) {
    const next = queue.shift();
    if (next.point === 'end') {
      paths++;
    } else {
      const neighbors = connections[next.point].filter(p => p !== 'start');
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
