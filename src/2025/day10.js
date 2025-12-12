import { memoize } from "../utils/memoize.js";

// Helper function to generate all combinations
function* product(...arrays) {
  if (arrays.length === 0) yield [];
  else {
    const [head, ...tail] = arrays;
    for (const item of head) {
      for (const rest of product(...tail)) {
        yield [item, ...rest];
      }
    }
  }
}

function parse(input) {
  let parseTuple = str => str.slice(1, -1).split(",").map(Number);
  let machines = input.split("\n").map(line => {
    const parts = line.split(" ");
    const dia = Array.from(parts[0].slice(1, -1)).map(c => (c === "#" ? 1 : 0));
    const buttons = parts.slice(1, -1).map(x => parseTuple(x));
    const jolts = parseTuple(parts[parts.length - 1]);
    return { dia, buttons, jolts };
  });
  return machines;
}

function producePatterns(buttons, jolts) {
  const ops = {},
    patterns = {};
  for (const pressed of product(...Array(buttons.length).fill([0, 1]))) {
    const jolt = Array(jolts.length).fill(0);
    for (let i = 0; i < pressed.length; i++) {
      if (pressed[i]) {
        for (const j of buttons[i]) jolt[j] += pressed[i];
      }
    }
    const lights = jolt.map(x => x % 2);
    const key = JSON.stringify(pressed);
    const lightsKey = JSON.stringify(lights);
    ops[key] = jolt;
    if (!patterns[lightsKey]) patterns[lightsKey] = [];
    patterns[lightsKey].push(pressed);
  }
  return { ops, patterns };
}

export function part1(input) {
  let machines = parse(input);
  let p1 = 0;
  for (const { dia, buttons, jolts } of machines) {
    const { patterns } = producePatterns(buttons, jolts);
    const diaKey = JSON.stringify(dia);
    p1 += Math.min(...patterns[diaKey].map(x => x.reduce((a, b) => a + b, 0)));
  }
  return p1;
}

export function part2(input) {
  let p2 = 0;
  let machines = parse(input);

  for (const { buttons, jolts } of machines) {
    const { ops, patterns } = producePatterns(buttons, jolts);

    let presses = memoize(target => {
      if (target.every(x => x === 0)) return 0;
      if (target.some(x => x < 0)) return Infinity;

      const lights = target.map(x => x % 2);
      const lightsKey = JSON.stringify(lights);
      if (!patterns[lightsKey]) return Infinity;

      let total = Infinity;
      for (const pressed of patterns[lightsKey]) {
        const diff = ops[JSON.stringify(pressed)];
        const newTarget = diff.map((a, i) => (target[i] - a) / 2);
        const sum = pressed.reduce((a, b) => a + b, 0);
        total = Math.min(total, sum + 2 * presses(newTarget));
      }
      return total;
    });

    p2 += presses(jolts);
  }
  return p2;
}
