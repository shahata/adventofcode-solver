function need(amount, element, reactions, spare) {
  if (spare[element]) {
    const take = Math.min(amount, spare[element]);
    amount -= take;
    spare[element] -= take;
  }
  const multiply = Math.ceil(amount / reactions[element].amount);
  spare[element] =
    (spare[element] || 0) + (reactions[element].amount * multiply - amount);
  return reactions[element].elements.map(x => [x[0] * multiply, x[1]]);
}

export function part1(input, fuelAmount = 1) {
  const reactions = input
    .split('\n')
    .map(x => {
      const [compounds, amount, element] = x
        .match(/^(.*) => (\d+) ([A-Z]+)$/)
        .slice(1)
        .map((x, i) => (i === 1 ? +x : x));
      const elements = compounds.split(', ').map(x =>
        x
          .match(/(\d+) ([A-Z]+)/)
          .slice(1)
          .map((x, i) => (i === 0 ? +x : x)),
      );
      return { element, amount, elements };
    })
    .reduce((prev, next) => Object.assign(prev, { [next.element]: next }), {});

  const spare = {};
  let requirements = [[fuelAmount, 'FUEL']];
  while (requirements.length > 1 || requirements[0][1] !== 'ORE') {
    const next = requirements.shift();
    if (next[1] === 'ORE') {
      requirements.push(next);
      continue;
    }
    const r = need(next[0], next[1], reactions, spare);
    r.forEach(([amount, element]) => {
      const f = requirements.find(x => x[1] === element);
      if (f) {
        f[0] += amount;
      } else {
        requirements.push([amount, element]);
      }
    });
  }
  return requirements[0][0];
}

export function part2(input) {
  const base = part1(input, 1);
  const value = 1000000000000;
  let start = Math.ceil(value / base);
  let end = Math.ceil((2 * value) / base);

  let mid = Math.floor((start + end) / 2);
  let result = part1(input, mid);
  while (result != value && start < end) {
    if (value < result) {
      end = mid - 1;
    } else if (value > result) {
      start = mid + 1;
    }
    mid = Math.floor((start + end) / 2);
    result = part1(input, mid);
  }
  return mid - (result > value ? 1 : 0);
}
