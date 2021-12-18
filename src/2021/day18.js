function reduce(snail) {
  let depth = 0;
  let last = -1;
  for (let i = 0; i < snail.length; i++) {
    if (snail[i].type === '[') depth++;
    if (snail[i].type === ']') depth--;
    if (snail[i].type === 'X') last = i;
    if (depth === 5) {
      const next = snail.findIndex((v, j) => j >= i + 4 && v.type === 'X');
      if (last !== -1) snail[last].value += snail[i + 1].value;
      if (next !== -1) snail[next].value += snail[i + 2].value;
      return !!snail.splice(i, 4, { type: 'X', value: 0 });
    }
  }

  const splitIndex = snail.findIndex(x => x.value >= 10);
  if (splitIndex !== -1) {
    const split = [
      { type: '[' },
      { type: 'X', value: Math.floor(snail[splitIndex].value / 2) },
      { type: 'X', value: Math.ceil(snail[splitIndex].value / 2) },
      { type: ']' },
    ];
    return !!snail.splice(splitIndex, 1, ...split);
  }
}

function add(a, b) {
  const snail = [{ type: '[' }, ...a, ...b, { type: ']' }];
  while (reduce(snail));
  return snail;
}

function magnitude(snail) {
  const sum = i => 3 * snail[i + 1].value + 2 * snail[i + 2].value;
  const pair = i => snail[i + 1].type === 'X' && snail[i + 2].type === 'X';
  while (snail.length > 1) {
    const next = snail.findIndex((v, i) => pair(i));
    snail.splice(next, 4, { type: 'X', value: sum(next) });
  }
  return snail[0].value;
}

function parse(str) {
  str = str.replaceAll(',', '');
  return str.split('').map(x => ({ type: isNaN(+x) ? x : 'X', value: +x }));
}

export function part1(input) {
  const lines = input.split('\n').map(parse);
  return magnitude(lines.reduce((a, b) => add(a, b)));
}

export function part2(input) {
  const lines = input.split('\n');
  let max = 0;
  for (let a of lines) {
    for (let b of lines) {
      let result = a !== b ? add(parse(a), parse(b)) : [{ value: 0 }];
      max = Math.max(max, magnitude(result));
    }
  }
  return max;
}
