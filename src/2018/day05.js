const u = x => x.toUpperCase();
const abc = "abcdefghijklmnopqrstuvwxyz".split("");
const kill = abc.reduce((arr, x) => arr.concat([x + u(x), u(x) + x]), []);

export function part1(input) {
  let len;
  const remove = x => (input = input.replace(x, ""));
  while (input.length !== len) {
    len = input.length;
    kill.forEach(remove);
  }
  return input.length;
}

export function part2(input) {
  const options = abc.map(x => new RegExp(x, "ig"));
  return Math.min(...options.map(x => part1(input.replace(x, ""))));
}
