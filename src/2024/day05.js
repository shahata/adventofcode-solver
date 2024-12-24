function correct(update, rules) {
  for (let i = 0; i < update.length; i++) {
    for (let j = 0; j < i; j++) {
      if (rules.has(`${update[i]}|${update[j]}`)) {
        return () => ([update[i], update[j]] = [update[j], update[i]]);
      }
    }
  }
  return true;
}

function parse(input) {
  let [rules, updates] = input.split("\n\n");
  rules = new Set(rules.split("\n"));
  updates = updates.split("\n").map(update => update.split(",").map(Number));
  return [rules, updates];
}

export function part1(input) {
  let sum = 0;
  let [rules, updates] = parse(input);
  for (let update of updates) {
    if (correct(update, rules) === true) {
      sum += update[(update.length - 1) / 2];
    }
  }
  return sum;
}

export function part2(input) {
  let sum = 0;
  let [rules, updates] = parse(input);
  for (let update of updates) {
    if (correct(update, rules) !== true) {
      let fix;
      while (fix !== true) {
        fix = correct(update, rules);
        if (typeof fix === "function") fix();
      }
      sum += update[(update.length - 1) / 2];
    }
  }
  return sum;
}
