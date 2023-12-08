function parse(input) {
  let [steps, maps] = input.split('\n\n');
  maps = maps.split('\n').map(map => {
    const [, node, left, right] = map.match(/^(.+) = \((.+), (.+)\)$/);
    return { node, left, right };
  });
  maps = maps.reduce((acc, map) => ({ ...acc, [map.node]: map }), {});
  return { steps, maps };
}

function walk(current, steps, maps, dest = key => key === 'ZZZ') {
  let count = 0;
  while (!dest(current)) {
    for (let i = 0; i < steps.length; i++) {
      count++;
      const step = steps[i];
      if (step === 'L') {
        current = maps[current].left;
      } else if (step === 'R') {
        current = maps[current].right;
      }
    }
  }
  return count;
}

function lcm(numbers) {
  return numbers
    .map(x => Math.abs(x))
    .reduce((a, b) => {
      const m = a * b;
      while (b) {
        const t = b;
        b = a % b;
        a = t;
      }
      return m / a;
    });
}

export function part1(input) {
  const { steps, maps } = parse(input);
  return walk('AAA', steps, maps);
}

export function part2(input) {
  const { steps, maps } = parse(input);
  const current = Object.keys(maps).filter(key => key.endsWith('A'));
  let counts = current.map(key =>
    walk(key, steps, maps, key => key.endsWith('Z')),
  );
  return lcm(counts);
}
