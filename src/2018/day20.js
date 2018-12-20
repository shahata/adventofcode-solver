const walk = {
  W: ({ x, y }) => ({ x: x - 1, y: y + 0 }),
  E: ({ x, y }) => ({ x: x + 1, y: y + 0 }),
  N: ({ x, y }) => ({ x: x + 0, y: y - 1 }),
  S: ({ x, y }) => ({ x: x + 0, y: y + 1 }),
};
const pos = ({ x, y }) => `${x},${y}`;

function traverse(current, path, map) {
  let next;
  while (path.length > 0 && next !== '(') {
    next = path.shift();
    if (walk[next]) {
      current = walk[next](current);
      map.set(pos(current), '|');
      current = walk[next](current);
      map.set(pos(current), '.');
    }
  }
  if (path.length > 0) {
    let depth = 1;
    let option = [];
    const options = [];
    while (next !== ')' || depth > 0) {
      next = path.shift();
      if (next === '(') {
        depth++;
      } else if (next === ')') {
        depth--;
      }
      if ((depth === 1 && next === '|') || (depth === 0 && next === ')')) {
        options.push(option);
        option = [];
      } else {
        option.push(next);
      }
    }
    options.forEach(option => traverse(current, option.concat(path), map));
  }
}

function minimize(input) {
  return input.replace(/\(([NESW]+)\|\)/g, (s, p1) => {
    if (
      p1.match(/W/g).length === p1.match(/E/g).length &&
      p1.match(/N/g).length === p1.match(/S/g).length
    ) {
      return p1;
    } else {
      return s;
    }
  });
}

function calc(input) {
  const start = { x: 0, y: 0 };
  const map = new Map([[pos(start), '.']]);
  traverse(start, minimize(input.slice(1, input.length - 1)).split(''), map);

  const queue = [{ distance: 0, point: start }];
  const visited = new Set([pos(start)]);
  while (queue.length > 0) {
    const { distance, point } = queue.shift();
    map.set(pos(point), distance);
    const options = Object.keys(walk)
      .map(x => map.get(pos(walk[x](point))) === '|' && walk[x](walk[x](point)))
      .filter(x => x && !visited.has(pos(x)));
    options.forEach(option => {
      visited.add(pos(option));
      queue.push({ distance: distance + 1, point: option });
    });
  }
  return Array.from(map.values()).filter(x => typeof x === 'number');
}

function part1(input) {
  return Math.max(...calc(input).values());
}

function part2(input) {
  return calc(input).filter(x => x >= 1000).length;
}

module.exports = { part1, part2 };
