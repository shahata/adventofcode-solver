export function day(input, low = 17, high = 61) {
  let part1;

  function assign(state, dest, index, value) {
    state[dest] = {
      ...state[dest],
      [index]: (state[dest][index] || []).concat(value).sort((a, b) => a - b),
    };
    if (
      dest === "bots" &&
      state[dest][index][0] === low &&
      state[dest][index][1] === high
    ) {
      part1 = index;
    }
    return state;
  }

  function parse(line) {
    let match = line.match(
      /^bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)$/,
    );
    let [, bot, lowDest, lowIndex, highDest, highIndex] = match;
    return state => {
      if (state.bots[bot] && state.bots[bot].length === 2) {
        state = assign(state, `${lowDest}s`, +lowIndex, state.bots[bot][0]);
        state = assign(state, `${highDest}s`, +highIndex, state.bots[bot][1]);
        delete state.bots[bot];
        return true;
      }
    };
  }

  function init(lines) {
    return lines.reduce(
      (state, line) => {
        let [, value, bot] = line.match(/^value (\d+) goes to bot (\d+)$/);
        return assign(state, "bots", +bot, +value);
      },
      { bots: {}, outputs: {} },
    );
  }

  let lines = input.split("\n");
  let state = init(lines.filter(x => x.startsWith("value")));
  let instructions = lines.filter(x => x.startsWith("bot")).map(parse);
  while (instructions.some(update => update(state))) {
    /**/
  }

  let part2 = state.outputs[0] * state.outputs[1] * state.outputs[2];
  return { part1, part2 };
}
