function parse(input) {
  return input.split("\n").reduce((programs, x) => {
    let [, name, weight, children] = x.match(
      /^([^\s]+)\s+\((\d+)\)(?:\s+->\s+(.*))?$/,
    );
    return {
      ...programs,
      [name]: {
        name,
        weight: +weight,
        children: children && children.replace(/\s+/g, "").split(","),
      },
    };
  }, {});
}

function rightWeight(programs, name) {
  if (!programs[name].children) {
    return programs[name].weight;
  }
  let childrenWeight = programs[name].children.map(x =>
    rightWeight(programs, x),
  );
  if (childrenWeight.every(x => x === childrenWeight[0])) {
    return (
      childrenWeight.reduce((sum, x) => sum + x, 0) + programs[name].weight
    );
  } else {
    let unbalanced = childrenWeight.findIndex(
      x => childrenWeight.filter(y => x === y).length === 1,
    );
    let balanced = childrenWeight.findIndex(
      x => x !== childrenWeight[unbalanced],
    );
    let diff = childrenWeight[balanced] - childrenWeight[unbalanced];
    let unbalancedName = programs[name].children[unbalanced];
    throw new Error(programs[unbalancedName].weight + diff);
  }
}

export function part1(input) {
  let programs = parse(input);
  let children = Object.values(programs)
    .filter(x => x.children)
    .reduce((all, x) => all.concat(x.children), []);
  return Object.values(programs)
    .filter(x => x.children)
    .find(x => !children.includes(x.name)).name;
}

export function part2(input) {
  let programs = parse(input);
  try {
    rightWeight(programs, part1(input));
  } catch (e) {
    return +e.message;
  }
}
