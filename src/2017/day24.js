function parse(input) {
  return input.split('\n').map(x => x.split('/').map(n => +n));
}

function toKey(item) {
  return [
    Array.from(item.visited)
      .map(x => x.join('-'))
      .sort()
      .join(','),
    item.strength,
    item.port,
  ].join(':');
}

function getNext(components, current, cache) {
  const next = components.filter(x => {
    return (
      (x[0] === current.port || x[1] === current.port) &&
      !current.visited.has(x)
    );
  });
  return next
    .map(x => {
      return {
        visited: new Set(current.visited).add(x),
        strength: current.strength + x[0] + x[1],
        port: x[0] === current.port ? x[1] : x[0],
      };
    })
    .filter(x => {
      const key = toKey(x);
      return !cache.has(key) && cache.add(key);
    });
}

function solve(components, compare) {
  const cache = new Set();
  let max = { visited: new Set(), strength: 0, port: 0 };
  let queue = getNext(components, max, cache);
  while (queue.length > 0) {
    const current = queue.shift();
    max = compare(current, max) ? current : max;
    queue = queue.concat(getNext(components, current, cache));
  }
  return max.strength;
}

export function part1(input) {
  const components = parse(input);
  return solve(components, (current, max) => current.strength > max.strength);
}

export function part2(input) {
  const components = parse(input);
  return solve(components, (current, max) => {
    return (
      current.visited.size > max.visited.size ||
      (current.visited.size === max.visited.size &&
        current.strength > max.strength)
    );
  });
}
