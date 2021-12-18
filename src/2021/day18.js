function magnitude(expression) {
  while (expression.length > 1) {
    const i = expression.findIndex(
      (v, i, a) => v.type === 'number' && a[i + 1].type === 'number',
    );
    expression.splice(i - 1, 4, {
      type: 'number',
      value: 3 * expression[i].value + 2 * expression[i + 1].value,
    });
  }
  return expression[0].value;
}

function parse(str) {
  let expression = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '[') expression.push({ type: 'start' });
    if (str[i] === ']') expression.push({ type: 'end' });
    if (!isNaN(+str[i])) {
      expression.push({ type: 'number', value: +str[i] });
    }
  }
  return expression;
}

function reduce(expression = []) {
  let counter = 0;
  let lastNumber = -1;
  for (let i = 0; i < expression.length; i++) {
    if (expression[i].type === 'start') counter++;
    if (expression[i].type === 'end') counter--;
    if (expression[i].type === 'number') lastNumber = i;

    if (counter === 5) {
      const nextNumber = expression
        .slice(i + 4)
        .findIndex(v => v.type === 'number');
      if (lastNumber !== -1) {
        expression[lastNumber].value += expression[i + 1].value;
      }
      if (nextNumber !== -1) {
        expression[nextNumber + i + 4].value += expression[i + 2].value;
      }
      expression.splice(i, 4, { type: 'number', value: 0 });
      return true;
    }
  }

  const splitIndex = expression.findIndex(x => x.value >= 10);
  if (splitIndex !== -1) {
    const split = [
      { type: 'start' },
      { type: 'number', value: Math.floor(expression[splitIndex].value / 2) },
      { type: 'number', value: Math.ceil(expression[splitIndex].value / 2) },
      { type: 'end' },
    ];
    expression.splice(splitIndex, 1, ...split);
    return true;
  }
  return false;
}

function add(a, b) {
  const expression = [{ type: 'start' }, ...a, ...b, { type: 'end' }];
  while (reduce(expression));
  return expression;
}

export function part1(input) {
  const lines = input.split('\n').map(x => parse(x));
  return magnitude(lines.reduce((a, b) => add(a, b)));
}

export function part2(input) {
  const lines = input.split('\n');
  let max = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines.length; j++) {
      if (i !== j) {
        let result = add(parse(lines[i]), parse(lines[j]));
        max = Math.max(max, magnitude(result));
      }
    }
  }
  return max;
}
