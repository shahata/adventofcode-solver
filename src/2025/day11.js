function memoize(fn) {
  let memo = {};
  return (...x) => {
    let s = JSON.stringify(x);
    return (memo[s] = memo[s] ?? fn(...x));
  };
}

let solve = memoize((devices, curr, dac = true, fft = true) => {
  if (curr === "out") return dac && fft ? 1 : 0;
  if (curr === "dac") dac = true;
  if (curr === "fft") fft = true;
  return devices[curr].reduce(
    (sum, next) => sum + solve(devices, next, dac, fft),
    0,
  );
});

function parse(input) {
  let devices = {};
  input.split("\n").forEach(line => {
    let [name, rest] = line.split(": ");
    let outputs = rest.split(" ");
    devices[name] = outputs;
  });
  return devices;
}

export function part1(input) {
  return solve(parse(input), "you");
}

export function part2(input) {
  return solve(parse(input), "svr", false, false);
}
