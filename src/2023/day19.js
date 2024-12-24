function run(part, workflows, name = "in") {
  if (name === "A") return true;
  if (name === "R") return false;
  for (let rule of workflows[name]) {
    let { operator, key, value } = rule.condition;
    if (
      !operator ||
      (rule.condition.operator === "<" && part[key] < value) ||
      (rule.condition.operator === ">" && part[key] > value)
    )
      return run(part, workflows, rule.result);
  }
}

function run2(ranges, workflows, name = "in") {
  let count = 0;
  if (name === "A")
    return Object.values(ranges).reduce((a, b) => a * (b.max - b.min + 1), 1);
  if (name === "R") return 0;
  for (let rule of workflows[name]) {
    let { operator, key, value } = rule.condition;
    if (!operator || (ranges[key].min < value && ranges[key].max > value)) {
      let next = JSON.parse(JSON.stringify(ranges));
      if (operator === "<") next[key].max = (ranges[key].min = value) - 1;
      if (operator === ">") next[key].min = (ranges[key].max = value) + 1;
      count += run2(next, workflows, rule.result);
    }
  }
  return count;
}

function parse(input) {
  let [workflows, parts] = input.split("\n\n").map(s => s.split("\n"));
  workflows = workflows.map(workflow => {
    let [, name, rules] = workflow.match(/^(.*)\{(.*)\}$/);
    rules = rules.split(",").map(rule => {
      let [condition, result] = rule.split(":");
      let [, key, operator, value] = condition.split(/^(.)([<>])(.*)$/);
      return {
        condition: { key, value: +value, operator },
        result: operator ? result : condition,
      };
    });
    return [name, rules];
  });
  parts = parts.map(part => JSON.parse(part.replaceAll(/(.)=/g, '"$1":')));
  return { workflows: Object.fromEntries(workflows), parts };
}

export function part1(input) {
  let { workflows, parts } = parse(input);
  parts = parts.filter(part => run(part, workflows));
  parts = parts.map(part => Object.values(part).reduce((a, b) => a + b, 0));
  return parts.reduce((a, b) => a + b, 0);
}

export function part2(input) {
  let { workflows } = parse(input);
  let range = { min: 1, max: 4000 };
  let ranges = "xmas".split("").map(key => [key, { ...range }]);
  return run2(Object.fromEntries(ranges), workflows);
}
