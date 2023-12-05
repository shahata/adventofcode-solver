export function part1(input) {
  let [seeds, ...maps] = input.split('\n\n');
  seeds = seeds.split(': ')[1].split(' ').map(Number);
  maps = maps.map(m =>
    m
      .split('\n')
      .slice(1)
      .map(r => r.split(' ').map(Number)),
  );
  for (let map of maps) {
    seeds = seeds.map(seed => {
      const next = map.find(
        ([, source, length]) => seed >= source && seed < source + length,
      );
      if (next) {
        seed = next[0] + (seed - next[1]);
      }
      return seed;
    });
  }
  return Math.min(...seeds);
}

export function part2(input) {
  let [seeds, ...maps] = input.split('\n\n');
  seeds = seeds.split(': ')[1].split(' ').map(Number);
  maps = maps.map(m =>
    m
      .split('\n')
      .slice(1)
      .map(r => r.split(' ').map(Number)),
  );
  let seeds2 = [];
  for (let i = 0; i < seeds.length; i += 2) {
    seeds2.push([seeds[i], seeds[i + 1]]);
  }
  for (let map of maps) {
    seeds2 = seeds2.flatMap(range => {
      const result = [];
      while (range[1] > 0) {
        const next = map.find(
          ([, source, length]) =>
            range[0] >= source && range[0] < source + length,
        );
        if (next) {
          const length = Math.min(range[1], next[2] - (range[0] - next[1]));
          result.push([next[0] + (range[0] - next[1]), length]);
          range[0] += length;
          range[1] -= length;
        } else {
          result.push([...range]);
          range[1] = 0;
        }
      }
      return result;
    });
  }
  return Math.min(...seeds2.map(x => x[0]));
}
