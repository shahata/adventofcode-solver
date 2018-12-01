function toReducer(str) {
  const params = str.split(/\s+/);
  const ops = {
    cpy: (src, register) => state =>
      (state[register] = src.match(/^\d+$/) ? parseInt(src, 10) : state[src]),
    inc: register => state => state[register]++,
    dec: register => state => state[register]--,
    jnz: (register, distance) => state =>
      (state.index += state[register] === 0 ? 0 : parseInt(distance, 10) - 1),
  };
  const cmd = ops[params.shift()](...params);
  return state => {
    cmd(state);
    state.index++;
  };
}

function run(commands, state) {
  while (commands.length > state.index) {
    commands[state.index](state);
  }
  return state;
}

const part1 = input =>
  run(input.split('\n').map(toReducer), { a: 0, b: 0, c: 0, d: 0, index: 0 }).a;
const part2 = input =>
  run(input.split('\n').map(toReducer), { a: 0, b: 0, c: 1, d: 0, index: 0 }).a;

module.exports = { part1, part2 };
