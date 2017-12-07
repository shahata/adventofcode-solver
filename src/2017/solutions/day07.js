function parse(input) {
  return input.split('\n').map(x => {
    const [, name, weight, children] = x.match(/^([^\s]+)\s+\((\d+)\)(?:\s+->\s+(.*))?$/);
    return {name, weight: parseInt(weight, 10), children: children && children.replace(/\s+/g, '').split(',')};
  });
}

function day(input) {
  const programs = parse(input);
  const children = programs.filter(x => x.children).reduce((all, x) => all.concat(x.children), []);

  const part1 = programs.filter(x => x.children).find(x => !children.includes(x.name)).name;
  const part2 = input;

  return [part1, part2];
}

module.exports = {day};
