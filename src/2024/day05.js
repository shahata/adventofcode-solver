export function part1(input) {
  let [rules, updates] = input.split("\n\n");
  let sum = 0;
  rules = rules.split("\n").map(rule => rule.split("|").map(Number));
  updates = updates.split("\n").map(update => update.split(",").map(Number));
  for (const update of updates) {
    let middle = update[(update.length - 1) / 2];
    for (let i = 0; i < update.length; i++) {
      for (let j = 0; j < i; j++) {
        if (
          rules.find(rule => rule[0] === update[i] && rule[1] === update[j])
        ) {
          middle = 0;
          break;
        }
      }
      if (middle === 0) {
        break;
      }
    }
    sum += middle;
  }
  return sum;
}

export function part2(input) {
  let [rules, updates] = input.split("\n\n");
  let bad = [];
  rules = rules.split("\n").map(rule => rule.split("|").map(Number));
  updates = updates.split("\n").map(update => update.split(",").map(Number));
  for (const update of updates) {
    let middle = update[(update.length - 1) / 2];
    for (let i = 0; i < update.length; i++) {
      for (let j = 0; j < i; j++) {
        if (
          rules.find(rule => rule[0] === update[i] && rule[1] === update[j])
        ) {
          bad.push(update);
          middle = 0;
          break;
        }
      }
      if (middle === 0) {
        break;
      }
    }
  }

  let sum = 0;
  for (const update of bad) {
    let good = false;
    while (!good) {
      good = true;
      for (let i = 0; i < update.length; i++) {
        for (let j = 0; j < i; j++) {
          if (
            rules.find(rule => rule[0] === update[i] && rule[1] === update[j])
          ) {
            let tmp = update[i];
            update[i] = update[j];
            update[j] = tmp;
            good = false;
          }
        }
      }
    }
    let middle = update[(update.length - 1) / 2];
    sum += middle;
  }
  return sum;
}
