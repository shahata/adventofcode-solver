function day(input, low = 17, high = 61) {
  let part1;

  function assign(state, dest, index, value) {
    Object.assign(state[dest], {[index]: (state[dest][index] || []).concat(value).sort((a, b) => a - b)});
    if (dest === 'bots' && state[dest][index][0] === low && state[dest][index][1] === high) {
      part1 = index;
    }
    return state;
  }

  function parse(line) {
    const match = line.match(/^bot (\d+) gives low to (bot|output) (\d+) and high to (bot|output) (\d+)$/);
    const [, bot, lowDest, lowIndex, highDest, highIndex] = match;
    return state => {
      if (state.bots[bot] && state.bots[bot].length === 2) {
        state = assign(state, `${lowDest}s`, parseInt(lowIndex, 10), state.bots[bot][0]);
        state = assign(state, `${highDest}s`, parseInt(highIndex, 10), state.bots[bot][1]);
        delete state.bots[bot];
        return true;
      }
    };
  }

  function init(lines) {
    return lines.reduce((state, line) => {
      const [, value, bot] = line.match(/^value (\d+) goes to bot (\d+)$/);
      return assign(state, 'bots', parseInt(bot, 10), parseInt(value, 10));
    }, {bots: {}, outputs: {}});
  }

  const lines = input.split('\n');
  const state = init(lines.filter(x => x.startsWith('value')));
  const instructions = lines.filter(x => x.startsWith('bot')).map(parse);
  while (instructions.some(update => update(state))) {/**/}

  const part2 = state.outputs[0] * state.outputs[1] * state.outputs[2];
  return {part1, part2};
}

module.exports = {day};
