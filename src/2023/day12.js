function add(queue, next) {
  const remain = (next.pattern.match(/[^.]/g) || []).length;
  if (remain + next.buffer < next.counts.reduce((a, b) => a + b, 0)) return;

  const queued = queue.map.get(JSON.stringify(next));
  if (queued) {
    queued.x += next.x;
    return;
  } else {
    queue.arr.push(next);
    queue.map.set(JSON.stringify(next), next);
  }
}

function solve(pattern, counts) {
  let result = 0;
  const queue = { arr: [], map: new Map() };
  add(queue, { pattern, counts, buffer: 0, x: 1 });
  while (queue.arr.length > 0) {
    const next = queue.arr.shift();
    const { pattern, counts, buffer, x } = next;
    const c = pattern[0];
    next.pattern = pattern.slice(1);
    if (c === undefined) {
      if (buffer === 0 && counts.length === 0) result += x;
      if (buffer > 0 && buffer === counts[0] && counts.length === 1)
        result += x;
    } else if (buffer === 0) {
      if (c !== '#') add(queue, { ...next, buffer: 0 });
      if (c !== '.') add(queue, { ...next, buffer: 1 });
    } else if (counts.length > 0) {
      if (c !== '#' && buffer === counts[0])
        add(queue, { ...next, counts: counts.slice(1), buffer: 0 });
      if (c !== '.' && buffer !== counts[0])
        add(queue, { ...next, buffer: buffer + 1 });
    }
  }
  return result;
}

export function part1(input) {
  return input
    .split('\n')
    .map(line => {
      let [pattern, counts] = line.split(' ');
      counts = counts.split(',').map(Number);
      return solve(pattern, counts);
    })
    .reduce((a, b) => a + b);
}

export function part2(input) {
  return input
    .split('\n')
    .map(line => {
      let [pattern, counts] = line.split(' ');
      pattern = new Array(5).fill().map(() => pattern);
      counts = new Array(5).fill().map(() => counts);
      pattern = pattern.join('?');
      counts = counts.join(',').split(',').map(Number);
      return solve(pattern, counts);
    })
    .reduce((a, b) => a + b);
}
