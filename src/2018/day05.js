let u = x => x.toUpperCase();
let abc = "abcdefghijklmnopqrstuvwxyz".split("");
let kill = abc.reduce((arr, x) => arr.concat([x + u(x), u(x) + x]), []);

export function part1(input) {
  let len;
  let remove = x => (input = input.replace(x, ""));
  while (input.length !== len) {
    len = input.length;
    kill.forEach(remove);
  }
  return input.length;
}

export function part2(input) {
  let options = abc.map(x => new RegExp(x, "ig"));
  return Math.min(...options.map(x => part1(input.replace(x, ""))));
}
