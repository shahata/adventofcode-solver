const pattern = ['.#.', '..#', '###'];
const permutations2 = [
  '1234',
  '3412',
  '1324',
  '3142',
  '4321',
  '2143',
  '4231',
  '2413',
];
const permutations3 = [
  '123456789',
  '789456123',
  '147258369',
  '741852963',
  '987654321',
  '321654987',
  '963852741',
  '369258174',
];

function permute(str) {
  const permutations = str.length === 4 ? permutations2 : permutations3;
  return permutations.map(x => {
    const result = [];
    for (let i = 0; i < x.length; i++) {
      result[x[i]] = str[i];
    }
    return result.join('');
  });
}

function parse(input) {
  return input.split('\n').reduce((rules, line) => {
    const [from, to] = line.split(' => ');
    const keys = permute(from.replace(/\//g, ''));
    const value = to.split('/');
    return keys.reduce(
      (rules, key) => Object.assign(rules, { [key]: value }),
      rules,
    );
  }, {});
}

function divide(pattern, size) {
  const count = pattern.length / size;
  const result = [];
  for (let i = 0; i < count; i++) {
    const rows = pattern.slice(size * i, size * (i + 1));
    const row = [];
    for (let j = 0; j < count; j++) {
      const box = rows.map(x => x.slice(size * j, size * (j + 1)));
      row.push(box);
    }
    result.push(row);
  }
  return result;
}

function merge(divided) {
  return divided.reduce((result, boxes) => {
    const rows = [];
    for (let i = 0; i < boxes[0].length; i++) {
      rows.push(boxes.map(x => x[i]).join(''));
    }
    return result.concat(rows);
  }, []);
}

function mutate(pattern, rules) {
  const size = pattern.length % 2 === 0 ? 2 : 3;
  const divided = divide(pattern, size);
  return merge(
    divided.map(row =>
      row.map(x => {
        return rules[x.join('')];
      }),
    ),
  );
}

function part1(input, count = 5) {
  const rules = parse(input);
  let result = pattern;
  for (let i = 0; i < count; i++) {
    result = mutate(result, rules);
  }
  return result
    .join('')
    .split('')
    .filter(x => x === '#').length;
}

function part2(input) {
  return part1(input, 18);
}

module.exports = { part1, part2 };
