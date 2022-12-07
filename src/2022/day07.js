function calcTotals(fs, totals = []) {
  const keys = Object.keys(fs);
  let total = 0;
  for (const key of keys) {
    if (Number.isInteger(fs[key])) total += fs[key];
    else total += calcTotals(fs[key], totals)[0];
  }
  totals.unshift(total);
  return totals;
}

function parse(input) {
  const lines = input.split('\n');
  const fileSystem = {};
  let currentDir = [];
  for (const line of lines) {
    if (line.startsWith('$ cd ')) {
      const dir = line.slice(5);
      if (dir === '/') currentDir = [];
      else if (dir === '..') currentDir.pop();
      else currentDir.push(dir);
    } else if (!line.startsWith('$')) {
      const [size, name] = line.split(' ');
      const cd = currentDir.reduce((obj, d) => obj[d], fileSystem);
      cd[name] = size === 'dir' ? {} : +size;
    }
  }
  return calcTotals(fileSystem);
}

export function part1(input) {
  const totals = parse(input);
  return totals.filter(x => x <= 100000).reduce((a, b) => a + b);
}

export function part2(input) {
  const totals = parse(input);
  const free = 70000000 - totals[0];
  const missing = 30000000 - free;
  return totals.filter(x => x >= missing).sort((a, b) => a - b)[0];
}
