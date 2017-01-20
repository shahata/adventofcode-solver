'use strict';

function day(input) {
  const instructions = input.split('\n')
                            .map(x => x.match(/^(\w+) ([\w+-]+)(?:, ([\w+-]+))?$/)
                                       .map(x => x && x.match(/^[+-]/) ? parseInt(x, 10) : x))
                            .map(x => ({op: x[1], p1: x[2], p2: x[3]}));

  const operations = {
    hlf: (state, p1) => Object.assign({}, state, {[p1]: state[p1] / 2, next: state.next + 1}),
    tpl: (state, p1) => Object.assign({}, state, {[p1]: state[p1] * 3, next: state.next + 1}),
    inc: (state, p1) => Object.assign({}, state, {[p1]: state[p1] + 1, next: state.next + 1}),
    jmp: (state, p1) => Object.assign({}, state, {next: state.next + p1}),
    jie: (state, p1, p2) => Object.assign({}, state, {next: state.next + (state[p1] % 2 ? 1 : p2)}),
    jio: (state, p1, p2) => Object.assign({}, state, {next: state.next + (state[p1] !== 1 ? 1 : p2)})
  };

  function run(state, instructions) {
    while (instructions[state.next]) {
      const curr = instructions[state.next];
      state = operations[curr.op](state, curr.p1, curr.p2);
    }
    return state;
  }

  const part1 = run({a: 0, b: 0, next: 0}, instructions).b;
  const part2 = run({a: 1, b: 0, next: 0}, instructions).b;
  return [part1, part2];
}

module.exports = day;
