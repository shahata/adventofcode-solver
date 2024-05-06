const ops = {
  cpy: (src, register) => state =>
    (state[register] = src.match(/^\d+$/) ? +src : state[src]),
  inc: register => state => state[register]++,
  dec: register => state => state[register]--,
  jnz: (register, distance) => state =>
    (state.index += state[register] === 0 ? 0 : +distance - 1),
};

function toReducer(str) {
  let params = str.split(/\s+/);
  let cmd = ops[params.shift()](...params);
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

export function part1(input) {
  let state = { a: 0, b: 0, c: 0, d: 0, index: 0 };
  return run(input.split('\n').map(toReducer), state).a;
}

export function part2(input) {
  let state = { a: 0, b: 0, c: 1, d: 0, index: 0 };
  return run(input.split('\n').map(toReducer), state).a;
}
