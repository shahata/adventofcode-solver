function parse(input) {
  return input.split('\n').reduce((programs, x) => {
    const [, name, weight, children] = x.match(
      /^([^\s]+)\s+\((\d+)\)(?:\s+->\s+(.*))?$/,
    );
    return Object.assign(programs, {
      [name]: {
        name,
        weight: parseInt(weight, 10),
        children: children && children.replace(/\s+/g, '').split(','),
      },
    });
  }, {});
}

function rightWeight(programs, name) {
  if (!programs[name].children) {
    return programs[name].weight;
  }
  const childrenWeight = programs[name].children.map(x =>
    rightWeight(programs, x),
  );
  if (childrenWeight.every(x => x === childrenWeight[0])) {
    return (
      childrenWeight.reduce((sum, x) => sum + x, 0) + programs[name].weight
    );
  } else {
    const unbalanced = childrenWeight.findIndex(
      x => childrenWeight.filter(y => x === y).length === 1,
    );
    const balanced = childrenWeight.findIndex(
      x => x !== childrenWeight[unbalanced],
    );
    const diff = childrenWeight[balanced] - childrenWeight[unbalanced];
    const unbalancedName = programs[name].children[unbalanced];
    throw new Error(programs[unbalancedName].weight + diff);
  }
}

function part1(input) {
  const programs = parse(input);
  const children = Object.values(programs)
    .filter(x => x.children)
    .reduce((all, x) => all.concat(x.children), []);
  return Object.values(programs)
    .filter(x => x.children)
    .find(x => !children.includes(x.name)).name;
}

function part2(input) {
  const programs = parse(input);
  try {
    rightWeight(programs, part1(input));
  } catch (e) {
    return parseInt(e.message);
  }
}

module.exports = { part1, part2 };
