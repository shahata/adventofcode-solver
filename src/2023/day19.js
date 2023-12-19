function run(part, workflows, name = 'in') {
  const { rules } = workflows[name];
  let result = false;
  for (const rule of rules) {
    if (rule.condition === true) {
      result = true;
    } else if (rule.condition.operator === '<') {
      if (part[rule.condition.key] < rule.condition.value) result = true;
    } else if (rule.condition.operator === '>') {
      if (part[rule.condition.key] > rule.condition.value) result = true;
    }
    if (result) {
      if (rule.result === 'R') {
        return false;
      } else if (rule.result === 'A') {
        return true;
      } else {
        return run(part, workflows, rule.result);
      }
    }
  }
}

function parse(input) {
  let [workflows, parts] = input.split('\n\n');
  workflows = workflows
    .split('\n')
    .map(workflow => {
      let [name, rules] = workflow.replace('}', '').split('{');
      rules = rules.split(',').map(rule => {
        let [condition, result] = rule.split(':');
        if (condition.includes('<')) {
          const [key, value] = condition.split('<');
          condition = { key, value: +value, operator: '<' };
        } else if (condition.includes('>')) {
          const [key, value] = condition.split('>');
          condition = { key, value: +value, operator: '>' };
        } else if (result === undefined) {
          result = condition;
          condition = true;
        }
        return { condition, result };
      });
      return { name, rules };
    })
    .reduce((a, b) => ({ ...a, [b.name]: { rules: b.rules } }), {});

  parts = parts
    .split('\n')
    .map(part => JSON.parse(part.replaceAll(/(.)=/g, '"$1":')));
  return { workflows, parts };
}

export function part1(input) {
  let { workflows, parts } = parse(input);
  parts = parts.filter(part => run(part, workflows));
  parts = parts.map(part => Object.values(part).reduce((a, b) => a + b, 0));
  return parts.reduce((a, b) => a + b, 0);
}

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function run2(ranges, workflows, start = 'in') {
  const { rules } = workflows[start];
  let rangesTrue;
  let rangesFalse;
  let count = 0;
  for (const rule of rules) {
    if (rule.condition === true) {
      rangesTrue = deepCopy(ranges);
      rangesFalse = undefined;
    } else if (rule.condition.operator === '<') {
      rangesTrue = deepCopy(ranges);
      rangesTrue[rule.condition.key].max = Math.min(
        rule.condition.value - 1,
        rangesTrue[rule.condition.key].max,
      );
      rangesFalse = deepCopy(ranges);
      rangesFalse[rule.condition.key].min = Math.max(
        rule.condition.value,
        rangesFalse[rule.condition.key].min,
      );
    } else if (rule.condition.operator === '>') {
      rangesTrue = deepCopy(ranges);
      rangesTrue[rule.condition.key].min = Math.max(
        rule.condition.value + 1,
        rangesTrue[rule.condition.key].min,
      );
      rangesFalse = deepCopy(ranges);
      rangesFalse[rule.condition.key].max = Math.min(
        rule.condition.value,
        rangesFalse[rule.condition.key].max,
      );
    }
    if (rule.result === 'A') {
      const values = Object.values(rangesTrue);
      count += values.reduce((a, b) => a * (b.max - b.min + 1), 1);
    } else if (rule.result !== 'R') {
      count += run2(rangesTrue, workflows, rule.result);
    }
    ranges = rangesFalse;
    if (!ranges) break;
  }
  return count;
}

export function part2(input) {
  let { workflows } = parse(input);
  const result = run2(
    {
      x: { min: 1, max: 4000 },
      m: { min: 1, max: 4000 },
      a: { min: 1, max: 4000 },
      s: { min: 1, max: 4000 },
    },
    workflows,
  );
  return result;
}
