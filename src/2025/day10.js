function parse(input) {
  let machines = input.split("\n").map(line => {
    let [indicator, ...buttons] = line.split(" ");
    let joltage = buttons.pop();
    indicator = indicator
      .slice(1, -1)
      .split("")
      .map((x, i) => (x === "#" ? i : null))
      .filter(x => x !== null);
    buttons = buttons.map(button => {
      button = button
        .slice(1, -1)
        .split(",")
        .map(x => parseInt(x, 10));
      return new Set(button);
    });
    joltage = joltage
      .slice(1, -1)
      .split(",")
      .map(x => parseInt(x, 10));
    return { indicator: new Set(indicator), buttons: buttons, joltage };
  });
  return machines;
}

function minimumPresses(machine) {
  let { indicator, buttons } = machine;
  let queue = [];
  let visited = new Set();
  buttons.forEach(button => {
    queue.push({ pressed: 1, state: button });
  });
  while (queue.length > 0) {
    let { pressed, state } = queue.shift();
    let stateKey = Array.from(state)
      .sort((a, b) => a - b)
      .join(",");
    if (visited.has(stateKey)) continue;
    visited.add(stateKey);
    if (indicator.symmetricDifference(state).size === 0) {
      return pressed;
    }
    buttons.forEach(button => {
      queue.push({
        pressed: pressed + 1,
        state: button.symmetricDifference(state),
      });
    });
  }
}

function minimumPresses2(machine) {
  let { buttons, joltage } = machine;
  let queue = [];
  let visited = new Set();
  queue.push({ pressed: 0, state: [...joltage], pushes: [] });
  while (queue.length > 0) {
    let { pressed, state, pushes } = queue.shift();
    let stateKey = state.join(",");
    if (visited.has(stateKey)) continue;
    visited.add(stateKey);
    if (state.every(x => x === 0)) return pressed;
    if (state.some(x => x < 0)) continue;
    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];
      let next = [...state];
      button.forEach(pos => next[pos]--);
      queue.push({
        pressed: pressed + 1,
        state: next,
        pushes: pushes.concat(i),
      });
    }
  }
}

export function part1(input) {
  let machines = parse(input);
  let result = 0;
  machines.forEach(machine => (result += minimumPresses(machine)));
  return result;
}

export function part2(input) {
  let machines = parse(input);
  let result = 0;
  machines.forEach(machine => (result += minimumPresses2(machine)));
  return result;
}
