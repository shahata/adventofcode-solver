import { powerSet } from "combinatorial-generators";

function producePatterns(buttons, length) {
  let patterns = {};
  for (let pressed of powerSet(buttons)) {
    let lights = Array(length).fill(0);
    for (let button of pressed) for (let i of button) lights[i]++;
    let key = lights.map(x => x % 2).join("");
    patterns[key] = (patterns[key] || []).concat([pressed]);
  }
  return patterns;
}

function parse(input) {
  return input.split("\n").map(line => {
    let parts = line.replaceAll(/[[\](){}]/g, "").split(" ");
    let indicator = parts[0].replace(/./g, c => (c === "#" ? 1 : 0));
    let buttons = parts.slice(1).map(x => x.split(",").map(Number));
    let jolts = parts.at(-1).split(",").map(Number);
    let patterns = producePatterns(buttons, indicator.length);
    return { indicator, buttons, jolts, patterns };
  });
}

function minimumPresses(target, patterns) {
  if (target.every(x => x === 0)) return 0;
  if (target.some(x => x < 0)) return Infinity;
  let totals = [];
  // find minimum presses to make all jolt counters even numbers
  let options = patterns[target.map(x => x % 2).join("")] || [];
  for (let pressed of options) {
    let next = target.slice(0);
    for (let button of pressed) for (let i of button) next[i]--;
    // find the minimum presses to get jolts half way and multiply by 2
    next = next.map(x => x / 2);
    totals.push(pressed.length + 2 * minimumPresses(next, patterns));
  }
  return Math.min(...totals);
}

export function part1(input) {
  return parse(input).reduce((sum, { indicator, patterns }) => {
    return sum + Math.min(...patterns[indicator].map(x => x.length));
  }, 0);
}

export function part2(input) {
  return parse(input).reduce((sum, { jolts, patterns }) => {
    return sum + minimumPresses(jolts, patterns);
  }, 0);
}
