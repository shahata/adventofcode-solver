function run(part, workflows, name = 'in') {
  const { rules } = workflows[name];
  let result = false;
  for (const rule of rules) {
    const { operator, key, value } = rule.condition;
    if (!operator) result = true;
    if (rule.condition.operator === '<' && part[key] < value) result = true;
    if (rule.condition.operator === '>' && part[key] > value) result = true;
    if (result) {
      if (rule.result === 'R') return false;
      if (rule.result === 'A') return true;
      return run(part, workflows, rule.result);
    }
  }
}

function run2(ranges, workflows, start = 'in') {
  let count = 0;
  for (const rule of workflows[start].rules) {
    const { operator, key, value } = rule.condition;
    const next = JSON.parse(JSON.stringify(ranges));
    if (operator && ranges[key].min < value && ranges[key].max > value) {
      if (operator === '<') next[key].max = (ranges[key].min = value) - 1;
      else if (operator === '>') next[key].min = (ranges[key].max = value) + 1;
    }
    if (rule.result === 'A')
      count += Object.values(next).reduce((a, b) => a * (b.max - b.min + 1), 1);
    else if (rule.result !== 'R') count += run2(next, workflows, rule.result);
    else if (!operator) break;
  }
  return count;
}

function parse(input) {
  let [workflows, parts] = input.split('\n\n').map(s => s.split('\n'));
  workflows = workflows.map(workflow => {
    let [name, rules] = workflow.replace('}', '').split('{');
    rules = rules.split(',').map(rule => {
      let [condition, result] = rule.split(':');
      const [key, value] = condition.split(/[<>]/);
      const operator = condition.match(/[<>]/)?.[0];
      condition = { key, value: +value, operator };
      return { condition, result: operator ? result : key };
    });
    return [name, { rules }];
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
  const range = { min: 1, max: 4000 };
  const ranges = 'xmas'.split('').map(key => [key, { ...range }]);
  return run2(Object.fromEntries(ranges), workflows);
}
