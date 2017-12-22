function add1({steps, current, state}, number) {
  current = ((current + steps) % number) + 1;
  state.splice(current, 0, number);
  return {steps, current, state};
}

function part1(input, lookFor = 2017) {
  let spinner = {
    steps: parseInt(input, 10),
    current: 0,
    state: [0]
  };
  for (let i = 1; i <= 2017; i++) {
    spinner = add1(spinner, i);
  }
  return spinner.state[(spinner.state.indexOf(lookFor) + 1) % spinner.state.length];
}

function add2({steps, current, zeroPosition, result}, number) {
  current = ((current + steps) % number) + 1;
  if (current === zeroPosition + 1) {
    result = number;
  } else if (current <= zeroPosition) {
    zeroPosition++;
  }
  return {steps, current, zeroPosition, result};
}

function part2(input, times = 50 * 1000 * 1000) {
  let spinner = {
    steps: parseInt(input, 10),
    current: 0,
    zeroPosition: 0,
    result: undefined
  };
  for (let i = 1; i <= times; i++) {
    spinner = add2(spinner, i);
  }
  return spinner.result;
}

module.exports = {part1, part2};
