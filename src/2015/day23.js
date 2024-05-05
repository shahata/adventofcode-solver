const operations = {
  hlf: (state, p1) => ({ ...state, [p1]: state[p1] / 2, next: state.next + 1 }),
  tpl: (state, p1) => ({ ...state, [p1]: state[p1] * 3, next: state.next + 1 }),
  inc: (state, p1) => ({ ...state, [p1]: state[p1] + 1, next: state.next + 1 }),
  jmp: (state, p1) => ({ ...state, next: state.next + p1 }),
  jie: (state, p1, p2) => ({
    ...state,
    next: state.next + (state[p1] % 2 ? 1 : p2),
  }),
  jio: (state, p1, p2) => ({
    ...state,
    next: state.next + (state[p1] !== 1 ? 1 : p2),
  }),
};

function run(state, instructions) {
  while (instructions[state.next]) {
    let curr = instructions[state.next];
    state = operations[curr.op](state, curr.p1, curr.p2);
  }
  return state;
}

function parse(input) {
  return input
    .split('\n')
    .map(x => {
      return x
        .match(/^(\w+) ([\w+-]+)(?:, ([\w+-]+))?$/)
        .map(x => (x && x.match(/^[+-]/) ? +x : x));
    })
    .map(([, op, p1, p2]) => ({ op, p1, p2 }));
}

export function part1(input) {
  return run({ a: 0, b: 0, next: 0 }, parse(input)).b;
}

export function part2(input) {
  return run({ a: 1, b: 0, next: 0 }, parse(input)).b;
}
