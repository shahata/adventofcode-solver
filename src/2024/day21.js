const keypad = {
  7: { x: 0, y: 0 },
  8: { x: 1, y: 0 },
  9: { x: 2, y: 0 },
  4: { x: 0, y: 1 },
  5: { x: 1, y: 1 },
  6: { x: 2, y: 1 },
  1: { x: 0, y: 2 },
  2: { x: 1, y: 2 },
  3: { x: 2, y: 2 },
  X: { x: 0, y: 3 },
  0: { x: 1, y: 3 },
  A: { x: 2, y: 3 },
};

const arrowpad = {
  "X": { x: 0, y: 0 },
  "^": { x: 1, y: 0 },
  "A": { x: 2, y: 0 },
  "<": { x: 0, y: 1 },
  "v": { x: 1, y: 1 },
  ">": { x: 2, y: 1 },
};

let memory = {};
function type(code, pads) {
  if (pads.length === 0) return code.length;
  if (memory[`${code},${pads.length}`]) return memory[`${code},${pads.length}`];
  let pad = pads[0];
  let from = pad["A"];
  let pushes = 0;
  for (let button of code) {
    const to = pad[button];
    const queue = [{ ...from, push: "" }];
    let min = Infinity;
    while (queue.length) {
      const { x, y, push } = queue.shift();
      if (x === pad["X"].x && y === pad["X"].y) continue;
      if (x === to.x && y === to.y) {
        min = Math.min(min, type(`${push}A`, pads.slice(1)));
      }
      if (to.x > x) queue.push({ x: x + 1, y, push: `${push}>` });
      if (to.x < x) queue.push({ x: x - 1, y, push: `${push}<` });
      if (to.y > y) queue.push({ x, y: y + 1, push: `${push}v` });
      if (to.y < y) queue.push({ x, y: y - 1, push: `${push}^` });
    }
    pushes += min;
    from = to;
  }
  memory[`${code},${pads.length}`] = pushes;
  return pushes;
}

export function part1(input) {
  const codes = input.split("\n");
  return codes
    .map(code => {
      let pushes = type(code, [keypad, arrowpad, arrowpad]);
      return parseInt(code) * pushes;
    })
    .reduce((a, b) => a + b, 0);
}

export function part2(input) {
  const codes = input.split("\n");
  return codes
    .map(code => {
      let pushes = type(code, [keypad, ...new Array(25).fill(arrowpad)]);
      return parseInt(code) * pushes;
    })
    .reduce((a, b) => a + b, 0);
}
