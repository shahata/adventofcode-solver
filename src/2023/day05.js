function parse(input) {
  let [seeds, ...maps] = input.split("\n\n");
  seeds = seeds.split(": ")[1].split(" ").map(Number);
  maps = maps.map(m =>
    m
      .split("\n")
      .slice(1)
      .map(r => r.split(" ").map(Number)),
  );
  return { seeds, maps };
}

function translate(map, seed) {
  const next = map.find(x => seed >= x[1] && seed < x[1] + x[2]);
  return { seed: next ? next[0] + (seed - next[1]) : seed, next };
}

export function part1(input) {
  let { seeds, maps } = parse(input);
  for (const map of maps) {
    seeds = seeds.map(seed => translate(map, seed).seed);
  }
  return Math.min(...seeds);
}

export function part2(input) {
  const { seeds, maps } = parse(input);
  let seeds2 = [];
  for (let i = 0; i < seeds.length; i += 2) {
    seeds2.push({ start: seeds[i], length: seeds[i + 1] });
  }
  for (const map of maps) {
    seeds2 = seeds2.flatMap(range => {
      const result = [];
      while (range.length > 0) {
        const { seed, next } = translate(map, range.start);
        const remaining = next ? next[2] - (range.start - next[1]) : Infinity;
        const length = Math.min(range.length, remaining);
        result.push({ start: seed, length });
        range.start += length;
        range.length -= length;
      }
      return result;
    });
  }
  return Math.min(...seeds2.map(x => x.start));
}
