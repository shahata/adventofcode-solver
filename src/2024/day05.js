function correct(update, rules) {
  for (let i = 0; i < update.length; i++) {
    for (let j = 0; j < i; j++) {
      if (rules.has(`${update[i]}|${update[j]}`)) {
        return () => {
          let tmp = update[i];
          update[i] = update[j];
          update[j] = tmp;
        };
      }
    }
  }
  return true;
}

export function part1(input) {
  let [rules, updates] = input.split("\n\n");
  let sum = 0;
  rules = new Set(rules.split("\n"));
  updates = updates.split("\n").map(update => update.split(",").map(Number));
  for (const update of updates) {
    let middle = update[(update.length - 1) / 2];
    if (correct(update, rules) === true) sum += middle;
  }
  return sum;
}

export function part2(input) {
  let [rules, updates] = input.split("\n\n");
  let bad = [];
  rules = new Set(rules.split("\n"));
  updates = updates.split("\n").map(update => update.split(",").map(Number));
  for (const update of updates) {
    if (correct(update, rules) !== true) bad.push(update);
  }

  let sum = 0;
  for (const update of bad) {
    let fix;
    do {
      fix = correct(update, rules);
      if (typeof fix === "function") fix();
    } while (fix !== true);
    sum += update[(update.length - 1) / 2];
  }
  return sum;
}
