import { lines } from '../utils/commons.js';

function toReducer(str) {
  const params = str.split(/\s+/);
  const ops = {
    cpy: (src, register) => state =>
      (state[register] = src.match(/^\d+$/) ? +src : state[src]),
    inc: register => state => state[register]++,
    dec: register => state => state[register]--,
    jnz: (register, distance) => state =>
      (state.index += state[register] === 0 ? 0 : +distance - 1),
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

export const part1 = input =>
  run(lines(input).map(toReducer), { a: 0, b: 0, c: 0, d: 0, index: 0 }).a;
export const part2 = input =>
  run(lines(input).map(toReducer), { a: 0, b: 0, c: 1, d: 0, index: 0 }).a;
