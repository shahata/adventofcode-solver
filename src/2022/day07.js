function calcTotals(fs, totals = []) {
  let keys = Object.keys(fs);
  let total = 0;
  for (let key of keys) {
    if (Number.isInteger(fs[key])) total += fs[key];
    else total += calcTotals(fs[key], totals)[0];
  }
  totals.unshift(total);
  return totals;
}

function parse(input) {
  let lines = input.split("\n");
  let fileSystem = {};
  let currentDir = [];
  for (let line of lines) {
    if (line.startsWith("$ cd ")) {
      let dir = line.slice(5);
      if (dir === "/") currentDir = [];
      else if (dir === "..") currentDir.pop();
      else currentDir.push(dir);
    } else if (!line.startsWith("$")) {
      let [size, name] = line.split(" ");
      let cd = currentDir.reduce((obj, d) => obj[d], fileSystem);
      cd[name] = size === "dir" ? {} : +size;
    }
  }
  return calcTotals(fileSystem);
}

export function part1(input) {
  let totals = parse(input);
  return totals.filter(x => x <= 100000).reduce((a, b) => a + b);
}

export function part2(input) {
  let totals = parse(input);
  let free = 70000000 - totals[0];
  let missing = 30000000 - free;
  return totals.filter(x => x >= missing).sort((a, b) => a - b)[0];
}
