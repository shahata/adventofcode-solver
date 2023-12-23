function addTeleports(map) {
  const teleports = {};
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map.length; x++) {
      if (map[y][x] === '#') continue;
      const neighbors = [
        { x: x + 1, y },
        { x: x - 1, y },
        { x, y: y + 1 },
        { x, y: y - 1 },
      ].filter(({ x, y }) => map[y]?.[x] && map[y][x] !== '#');
      if (neighbors.length === 2) continue;
      neighbors.forEach(n => {
        let prev = { x, y };
        const trail = [prev];
        while (n) {
          trail.push(n);
          const neighbors = [
            { x: n.x + 1, y: n.y },
            { x: n.x - 1, y: n.y },
            { x: n.x, y: n.y + 1 },
            { x: n.x, y: n.y - 1 },
          ].filter(
            ({ x, y }) =>
              map[y]?.[x] &&
              map[y][x] !== '#' &&
              (prev.x !== x || prev.y !== y),
          );
          if (neighbors.length === 1 && map[n.y][n.x] === '.') {
            prev = n;
            n = neighbors[0];
          } else {
            n = null;
          }
        }
        if (trail.length > 4) {
          teleports[`${trail.at(1).x},${trail.at(1).y}`] = {
            dest: trail.at(-1),
            steps: trail.length - 2,
            visited: trail.at(-2),
          };
          teleports[`${trail.at(-2).x},${trail.at(-2).y}`] = {
            dest: trail.at(0),
            steps: trail.length - 2,
            visited: trail.at(1),
          };
        }
      });
    }
  }
  return teleports;
}

export function part1(input) {
  const map = input.split('\n').map(line => line.split(''));
  const teleports = addTeleports(map);
  let start = { x: 1, y: 0, steps: 0, visited: new Set() };
  let end = { x: map.length - 2, y: map.length - 1 };
  let queue = [start];
  const result = new Set();
  while (queue.length > 0) {
    const next = queue.shift();
    next.visited.add(`${next.x},${next.y}`);
    if (next.x === end.x && next.y === end.y) {
      if (Math.max(...result) < next.steps) console.log(next.steps);
      result.add(next.steps);
      continue;
    }
    let neighbors = [
      {
        x: next.x + 1,
        y: next.y,
        steps: next.steps + 1,
        visited: new Set(next.visited),
      },
      {
        x: next.x - 1,
        y: next.y,
        steps: next.steps + 1,
        visited: new Set(next.visited),
      },
      {
        x: next.x,
        y: next.y + 1,
        steps: next.steps + 1,
        visited: new Set(next.visited),
      },
      {
        x: next.x,
        y: next.y - 1,
        steps: next.steps + 1,
        visited: new Set(next.visited),
      },
    ];
    if (map[next.y][next.x] === '>') {
      neighbors = neighbors.filter(n => n.x > next.x);
    } else if (map[next.y][next.x] === '<') {
      neighbors = neighbors.filter(n => n.x < next.x);
    } else if (map[next.y][next.x] === '^') {
      neighbors = neighbors.filter(n => n.y < next.y);
    } else if (map[next.y][next.x] === 'v') {
      neighbors = neighbors.filter(n => n.y > next.y);
    }
    neighbors = neighbors.filter(
      n =>
        map[n.y]?.[n.x] &&
        map[n.y][n.x] !== '#' &&
        !next.visited.has(`${n.x},${n.y}`),
    );
    neighbors = neighbors.map(n => {
      const teleport = teleports[`${n.x},${n.y}`];
      if (teleport && !n.visited.has(`${teleport.dest.x},${teleport.dest.y}`)) {
        n.visited.add(`${n.x},${n.y}`);
        n.visited.add(`${teleport.visited.x},${teleport.visited.y}`);
        return {
          ...teleport.dest,
          steps: n.steps + teleport.steps,
          visited: n.visited,
        };
      }
      return n;
    });
    queue.push(...neighbors);
    queue.sort((a, b) => a.x + a.y - b.x - b.y + b.steps - a.steps);
  }
  return Math.max(...result);
}

export function part2(input) {
  return part1(input.replace(/[<>^v]/g, '.'));
}
