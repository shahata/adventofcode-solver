function topad(str) {
  let result = {};
  let pad = str.split("\n").map(row => row.split(""));
  pad.map((row, y) => row.map((c, x) => (result[c] = { x, y })));
  return result;
}

let memory = {};
let keypad = topad("789\n456\n123\nX0A");
let arrowpad = topad("X^A\n<v>");
function type(code, robots, human = false) {
  if (robots === 0) return code.length;
  if (memory[`${code},${robots}`]) return memory[`${code},${robots}`];
  let pad = human ? keypad : arrowpad;
  let from = pad["A"];
  let pushes = 0;
  for (let button of code) {
    let to = pad[button];
    let queue = [{ ...from, push: "" }];
    let min = Infinity;
    while (queue.length) {
      let { x, y, push } = queue.shift();
      if (x === pad["X"].x && y === pad["X"].y) continue;
      if (x === to.x && y === to.y) {
        min = Math.min(min, type(`${push}A`, human ? robots : robots - 1));
      }
      if (to.x > x) queue.push({ x: x + 1, y, push: `${push}>` });
      if (to.x < x) queue.push({ x: x - 1, y, push: `${push}<` });
      if (to.y > y) queue.push({ x, y: y + 1, push: `${push}v` });
      if (to.y < y) queue.push({ x, y: y - 1, push: `${push}^` });
    }
    pushes += min;
    from = to;
  }
  memory[`${code},${robots}`] = pushes;
  return pushes;
}

function solve(input, robots) {
  return input
    .split("\n")
    .map(code => parseInt(code) * type(code, robots, true))
    .reduce((a, b) => a + b, 0);
}

export function part1(input) {
  return solve(input, 2);
}

export function part2(input) {
  return solve(input, 25);
}
