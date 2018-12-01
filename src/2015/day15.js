function day(input) {
  function add(digits, param, i) {
    i = i || 0;
    if (i < digits.length) {
      const sum = digits[i] + param;
      const pass = Math.floor(sum / 101);
      digits[i] = sum % 101;
      return pass ? add(digits, pass, i + 1) : digits;
    }
  }

  function parseMap(s, p1, p2) {
    return s
      .split(p1)
      .map(x => x.split(p2))
      .reduce(
        (obj, pair) => ({ ...obj, [pair[0]]: parseInt(pair[1], 10) }),
        {},
      );
  }

  function objMap(obj, fn) {
    return Object.keys(obj).reduce((result, key) => {
      return { ...result, [key]: fn(obj[key], key) };
    }, {});
  }

  const ingredients = input
    .split('\n')
    .map(x => x.match(/^.*: (.*)$/))
    .map(x => parseMap(x[1], ', ', ' '));

  let part1 = 0,
    part2 = 0;
  const spoons = new Array(ingredients.length).fill(0);
  while (add(spoons, 100)) {
    if (spoons.reduce((prev, x) => prev + x) === 100) {
      const amounts = ingredients.map((x, index) =>
        objMap(x, property => property * spoons[index]),
      );
      const sum = amounts.reduce((prev, x) =>
        objMap(x, (value, key) => prev[key] + value),
      );
      const properties = Object.keys(sum).filter(x => x !== 'calories');
      const result = properties
        .map(x => Math.max(0, sum[x]))
        .reduce((prev, x) => prev * x);

      part1 = Math.max(part1, result);
      if (sum.calories === 500) {
        part2 = Math.max(part2, result);
      }
    }
  }

  return { part1, part2 };
}

module.exports = { day };
