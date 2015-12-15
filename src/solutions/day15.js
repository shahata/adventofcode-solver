'use strict';

export function day15(input) {
  function next(digits, i) {
    i = i || 0;
    if (i === digits.length) {
      return null;
    } else if (digits[i] === 100) {
      digits[i] = 0;
      return next(digits, i + 1);
    } else {
      digits[i]++;
      return digits;
    }
  }

  function objMap(obj, fn) {
    return Object.keys(obj).reduce((result, key) => {
      return Object.assign(result, {[key]: fn(obj[key], key)});
    }, {});
  }

  let ingredients = input.split('\n')
                         .map(x => x.match(/^.*: capacity ([-\d]+), durability ([-\d]+), flavor ([-\d]+), texture ([-\d]+), calories ([-\d]+)$/).slice(1))
                         .map(x => ({capacity: x[0], durability: x[1], flavor: x[2], texture: x[3], calories: x[4]}))
                         .map(x => objMap(x, num => parseInt(num, 10)));

  let part1 = 0, part2 = 0;
  let spoons = new Array(ingredients.length).fill(0);
  while (next(spoons)) {
    if (spoons.reduce((prev, x) => prev + x) === 100) {
      let amounts = spoons.map((amount, index) => objMap(ingredients[index], x => amount * x));
      let sum = amounts.reduce((prev, x) => objMap(x, (value, key) => prev[key] + value));
      let properties = Object.keys(sum).filter(x => x !== 'calories');
      let result = properties.map(x => Math.max(0, sum[x])).reduce((prev, x) => prev * x, 1);

      part1 = Math.max(part1, result);
      if (sum.calories === 500) {
        part2 = Math.max(part2, result);
      }
    }
  }

  return [part1, part2];
}
