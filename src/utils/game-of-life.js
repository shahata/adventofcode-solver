export function generation(map, neighbors, alive) {
  const next = new Map();
  let missing = [];
  let count = 0;

  for (const key of map.keys()) {
    if (map.get(key)) {
      missing = missing.concat(neighbors(key).filter(key => !map.has(key)));
    }
  }
  missing.forEach(key => map.set(key, false));

  for (const key of map.keys()) {
    const active = neighbors(key).filter(key => map.get(key)).length;
    const current = map.get(key);
    next.set(key, alive(current, active));
    if (next.get(key)) {
      count++;
    }
  }
  return { next, count };
}

export function gol(map, neighbors, alive, iterations) {
  let result;
  for (let i = 0; i < iterations; i++) {
    result = generation(map, neighbors, alive);
    map = result.next;
  }
  return result;
}
