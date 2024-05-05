// ev dec -705 if cag != 2
// b dec -195 if ty >= -8
// red dec -404 if v > -7
// d inc -971 if k >= -9
// k inc 303 if k > -8

function parse(input) {
  const dic = {
    'inc': (a, b) => a + b,
    'dec': (a, b) => a - b,
    '>': (a, b) => a > b,
    '<': (a, b) => a < b,
    '>=': (a, b) => a >= b,
    '<=': (a, b) => a <= b,
    '==': (a, b) => a === b,
    '!=': (a, b) => a !== b,
  };
  return input.split('\n').map(x => {
    const [variable, operator, param, , compVariable, compOperator, compParam] =
      x.split(/\s+/);
    return state => {
      state[variable] = state[variable] || 0;
      state[compVariable] = state[compVariable] || 0;
      if (dic[compOperator](state[compVariable], +compParam)) {
        state[variable] = dic[operator](state[variable], +param);
      }
      return state;
    };
  });
}

function execute(commands) {
  return commands.reduce((state, cmd) => cmd(state), {});
}

function executeMax(commands) {
  const state = {};
  return commands.map(cmd => max(cmd(state)));
}

function max(registers) {
  return Object.values(registers)
    .sort((a, b) => a - b)
    .pop();
}

export function part1(input) {
  return max(execute(parse(input)));
}

export function part2(input) {
  return max(executeMax(parse(input)));
}
