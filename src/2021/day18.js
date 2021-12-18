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
      return expression;
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
  }
  return expression;
}

function reduceExpression(expression) {
  let prev = undefined;
  while (prev !== expression.length) {
    prev = expression.length;
    expression = reduce(expression);
  }
  return expression;
}

export function part1(input) {
  const lines = input.split('\n').map(x => parse(x));
  let result = lines.shift();
  while (lines.length) {
    result.unshift({ type: 'start' });
    result.push(...lines.shift(), { type: 'end' });
    reduceExpression(result);
  }
  return magnitude(result);
}

export function part2(input) {
  const lines = input.split('\n');
  let final = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines.length; j++) {
      if (i !== j) {
        let result = reduceExpression([
          { type: 'start' },
          ...parse(lines[i]),
          ...parse(lines[j]),
          { type: 'end' },
        ]);
        final = Math.max(final, magnitude(result));
      }
    }
  }
  return final;
}
