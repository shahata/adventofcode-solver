const pattern = [".#.", "..#", "###"];
const permutations2 = [
  [1, 2, 3, 4],
  [3, 4, 1, 2],
  [1, 3, 2, 4],
  [3, 1, 4, 2],
  [4, 3, 2, 1],
  [2, 1, 4, 3],
  [4, 2, 3, 1],
  [2, 4, 1, 3],
];
const permutations3 = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [7, 8, 9, 4, 5, 6, 1, 2, 3],
  [1, 4, 7, 2, 5, 8, 3, 6, 9],
  [7, 4, 1, 8, 5, 2, 9, 6, 3],
  [9, 8, 7, 6, 5, 4, 3, 2, 1],
  [3, 2, 1, 6, 5, 4, 9, 8, 7],
  [9, 6, 3, 8, 5, 2, 7, 4, 1],
  [3, 6, 9, 2, 5, 8, 1, 7, 4],
];

function permute(str) {
  let permutations = str.length === 4 ? permutations2 : permutations3;
  return permutations.map(x => {
    let result = "";
    for (let i = 0; i < x.length; i++) {
      result += str[x[i] - 1];
    }
    return result;
  });
}

function parse(input) {
  return input.split("\n").reduce((rules, line) => {
    let [from, to] = line.split(" => ");
    let keys = permute(from.replace(/\//g, ""));
    let value = to.split("/");
    return keys.reduce((rules, key) => ({ ...rules, [key]: value }), rules);
  }, {});
}

function divide(pattern, size) {
  let count = pattern.length / size;
  let result = [];
  for (let i = 0; i < count; i++) {
    let rows = pattern.slice(size * i, size * (i + 1));
    let row = [];
    for (let j = 0; j < count; j++) {
      let box = rows.map(x => x.slice(size * j, size * (j + 1)));
      row.push(box);
    }
    result.push(row);
  }
  return result;
}

function merge(divided) {
  return divided.reduce((result, boxes) => {
    let rows = [];
    for (let i = 0; i < boxes[0].length; i++) {
      rows.push(boxes.map(x => x[i]).join(""));
    }
    return result.concat(rows);
  }, []);
}

function mutate(pattern, rules) {
  let size = pattern.length % 2 === 0 ? 2 : 3;
  let divided = divide(pattern, size);
  return merge(
    divided.map(row =>
      row.map(x => {
        return rules[x.join("")];
      }),
    ),
  );
}

export function part1(input, count = 5) {
  let rules = parse(input);
  let result = pattern;
  for (let i = 0; i < count; i++) {
    result = mutate(result, rules);
  }
  return result
    .join("")
    .split("")
    .filter(x => x === "#").length;
}

export function part2(input) {
  return part1(input, 18);
}
