import { memoize } from "../utils/memoize.js";

let solve = memoize((devices, curr, dac = true, fft = true) => {
  if (curr === "out") return dac && fft ? 1 : 0;
  return devices[curr].reduce(
    (sum, next) =>
      sum + solve(devices, next, dac || curr === "dac", fft || curr === "fft"),
    0,
  );
});

function parse(input) {
  return Object.fromEntries(
    input.split("\n").map(line => {
      let [name, rest] = line.split(": ");
      return [name, rest.split(" ")];
    }),
  );
}

export function part1(input) {
  return solve(parse(input), "you");
}

export function part2(input) {
  return solve(parse(input), "svr", false, false);
}
