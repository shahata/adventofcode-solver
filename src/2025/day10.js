import { memoize } from "../utils/memoize.js";

function* product(arrays) {
  if (arrays.length === 0) yield [];
  else {
    let [head, ...tail] = arrays;
    for (let item of head) {
      for (let rest of product(tail)) yield [item, ...rest];
    }
  }
}

function parse(input) {
  return input.split("\n").map(line => {
    let parts = line.replaceAll(/[[\](){}]/g, "").split(" ");
    let indicator = parts[0].replace(/./g, c => (c === "#" ? 1 : 0));
    let buttons = parts.map(x => x.split(",").map(Number));
    let jolts = parts.at(-1).split(",").map(Number);
    return { indicator, buttons, jolts };
  });
}

function producePatterns(buttons, length) {
  let patterns = {};
  for (let pressed of product(Array(buttons.length).fill([0, 1]))) {
    let lights = Array(length).fill(0);
    for (let i = 0; i < pressed.length; i++) {
      if (pressed[i]) for (let j of buttons[i]) lights[j] = lights[j] ? 0 : 1;
    }
    let key = lights.join("");
    patterns[key] = [...(patterns[key] || []), pressed];
  }
  return patterns;
}

export function part1(input) {
  let machines = parse(input);
  let p1 = 0;
  for (let { indicator, buttons } of machines) {
    let patterns = producePatterns(buttons, indicator.length);
    let sums = patterns[indicator].map(x => x.reduce((a, b) => a + b, 0));
    p1 += Math.min(...sums);
  }
  return p1;
}

export function part2(input) {
  let machines = parse(input);
  let p2 = 0;
  for (let { buttons, jolts } of machines) {
    let patterns = producePatterns(buttons, jolts.length);
    let presses = memoize(target => {
      if (target.every(x => x === 0)) return 0;
      if (target.some(x => x < 0)) return Infinity;

      let total = Infinity;
      let options = patterns[target.map(x => x % 2).join("")] || [];
      for (let pressed of options) {
        let jolt = Array(jolts.length).fill(0);
        for (let i = 0; i < pressed.length; i++) {
          if (pressed[i]) for (let j of buttons[i]) jolt[j] += pressed[i];
        }
        let newTarget = jolt.map((a, i) => (target[i] - a) / 2);
        let sum = pressed.reduce((a, b) => a + b, 0);
        total = Math.min(total, sum + 2 * presses(newTarget));
      }
      return total;
    });
    p2 += presses(jolts);
  }
  return p2;
}
