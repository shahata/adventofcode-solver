function getOptions(check, key) {
  let [x, y] = key.split(",").map(n => +n);
  if (check === "N") return [x, x - 1, x + 1].map(x => `${x},${y - 1}`);
  if (check === "S") return [x, x - 1, x + 1].map(x => `${x},${y + 1}`);
  if (check === "W") return [y, y - 1, y + 1].map(y => `${x - 1},${y}`);
  if (check === "E") return [y, y - 1, y + 1].map(y => `${x + 1},${y}`);
}

function move(elves, proposals) {
  let count = 0;
  for (let key of proposals.keys()) {
    let moving = proposals.get(key);
    if (moving.length === 1) {
      elves.delete(moving[0]);
      elves.add(key);
      count++;
    }
  }
  return count;
}

function round(elves, checks) {
  let proposals = new Map();
  for (let key of elves.keys()) {
    let all = checks.flatMap(check => getOptions(check, key));
    if (all.every(option => !elves.has(option))) continue;
    for (let check of checks) {
      let options = getOptions(check, key);
      if (options.every(option => !elves.has(option))) {
        let decision = options[0];
        proposals.set(decision, (proposals.get(decision) || []).concat(key));
        break;
      }
    }
  }
  checks.push(checks.shift());
  return move(elves, proposals);
}

function parse(input) {
  let elves = new Set();
  input.split("\n").forEach((line, y) =>
    line.split("").forEach((cell, x) => {
      if (cell === "#") elves.add(`${x},${y}`);
    }),
  );
  return { elves, checks: ["N", "S", "W", "E"] };
}

export function part1(input) {
  let { elves, checks } = parse(input);
  for (let i = 0; i < 10; i++) round(elves, checks);
  let keys = [...elves.keys()].map(key => key.split(","));
  let xs = keys.map(key => +key[0]).sort((a, b) => b - a);
  let ys = keys.map(key => +key[1]).sort((a, b) => b - a);
  return (xs.at(0) - xs.at(-1) + 1) * (ys.at(0) - ys.at(-1) + 1) - elves.size;
}

export function part2(input) {
  let { elves, checks } = parse(input);
  let result = 1;
  while (round(elves, checks) > 0) result++;
  return result;
}
