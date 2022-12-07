function calcTotals(fs) {
  const keys = Object.keys(fs);
  let total = 0;
  for (const key of keys) {
    if (Number.isInteger(fs[key])) total += fs[key];
    else total += calcTotals(fs[key]);
  }
  return (fs.__total = total);
}

function getTotals(fs) {
  const keys = Object.keys(fs);
  let totals = [];
  totals.push(fs.__total);
  for (const key of keys) {
    if (fs[key].__total) totals.push(...getTotals(fs[key]));
  }
  return totals;
}

function parse(input) {
  const lines = input.split('\n');
  let currentDir = [];
  let fileSystem = {};
  for (const line of lines) {
    if (line.startsWith('$ cd ')) {
      const dir = line.slice(5);
      if (dir === '/') currentDir = [];
      else if (dir === '..') currentDir.pop();
      else currentDir.push(dir);
    } else if (!line.startsWith('$')) {
      const [size, name] = line.split(' ');
      let obj = currentDir.reduce((obj, d) => obj[d], fileSystem);
      obj[name] = size === 'dir' ? {} : +size;
    }
  }
  return fileSystem;
}

export function part1(input) {
  const fileSystem = parse(input);
  calcTotals(fileSystem);
  return getTotals(fileSystem)
    .filter(x => x <= 100000)
    .reduce((a, b) => a + b);
}

export function part2(input) {
  const fileSystem = parse(input);
  const missing = 30000000 - (70000000 - calcTotals(fileSystem));
  return getTotals(fileSystem)
    .filter(x => x >= missing)
    .sort((a, b) => a - b)[0];
}
