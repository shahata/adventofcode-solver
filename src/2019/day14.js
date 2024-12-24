function need(amount, element, reactions, spare) {
  if (spare[element]) {
    let take = Math.min(amount, spare[element]);
    amount -= take;
    spare[element] -= take;
  }
  let multiply = Math.ceil(amount / reactions[element].amount);
  spare[element] =
    (spare[element] || 0) + (reactions[element].amount * multiply - amount);
  return reactions[element].elements.map(x => [x[0] * multiply, x[1]]);
}

export function part1(input, fuelAmount = 1) {
  let reactions = input
    .split("\n")
    .map(x => {
      let [, compounds, amount, element] = x.match(/^(.*) => (\d+) ([A-Z]+)$/);
      let elements = compounds.split(", ").map(x =>
        x
          .match(/(\d+) ([A-Z]+)/)
          .slice(1)
          .map((x, i) => (i === 0 ? +x : x)),
      );
      return { element, amount: +amount, elements };
    })
    .reduce((prev, next) => Object.assign(prev, { [next.element]: next }), {});

  let spare = {};
  let requirements = [{ amount: fuelAmount, element: "FUEL" }];
  while (requirements.length > 1 || requirements[0].element !== "ORE") {
    let next = requirements.shift();
    if (next.element === "ORE") {
      requirements.push(next);
      continue;
    }
    let r = need(next.amount, next.element, reactions, spare);
    r.forEach(([amount, element]) => {
      let f = requirements.find(x => x.element === element);
      if (f) {
        f.amount += amount;
      } else {
        requirements.push({ amount, element });
      }
    });
  }
  return requirements[0].amount;
}

export function part2(input) {
  let base = part1(input, 1);
  let value = 1000000000000;
  let start = Math.ceil(value / base);
  let end = Math.ceil((2 * value) / base);

  let mid = Math.floor((start + end) / 2);
  let result = part1(input, mid);
  while (result !== value && start < end) {
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
