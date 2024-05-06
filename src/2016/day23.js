const ops = {
  cpy: (src, register) => state => {
    if (state[register] !== undefined) {
      src = state[src] === undefined ? +src : state[src];
      state[register] = src;
    }
  },
  inc: register => state => {
    if (state[register] !== undefined) {
      state[register]++;
    }
  },
  dec: register => state => {
    if (state[register] !== undefined) {
      state[register]--;
    }
  },
  jnz: (register, distance) => state => {
    if (
      (state[register] !== undefined && state[register] !== 0) ||
      (state[register] === undefined && register !== '0')
    ) {
      distance = state[distance] === undefined ? +distance : state[distance];
      state.index += distance - 1;
    }
  },
  tgl: distance => (state, commands) => {
    distance = state[distance] === undefined ? +distance : state[distance];
    toggle(commands[state.index + distance]);
  },
};

function toggle(command) {
  const dic = {
    cpy: 'jnz',
    inc: 'dec',
    dec: 'inc',
    jnz: 'cpy',
    tgl: 'inc',
  };
  if (command) {
    command.name = dic[command.name];
  }
}

function toReducer(str) {
  let params = str.split(/\s+/);
  let cmd = { name: params.shift(), params };
  return cmd;
}

function run(commands, state) {
  while (commands.length > state.index) {
    if (
      state.index === 4 &&
      commands
        .slice(4, 10)
        .map(x => x.name)
        .join(' ') === 'cpy inc dec jnz dec jnz'
    ) {
      state.a += state.b * state.d;
      state.c = 0;
      state.d = 0;
      state.index = 10;
    } else {
      let cmd = commands[state.index];
      ops[cmd.name](...cmd.params)(state, commands);
      state.index++;
    }
  }
  return state;
}

export function part1(input, state = { a: 7, b: 0, c: 0, d: 0, index: 0 }) {
  let commands1 = input.split('\n').map(toReducer);
  return run(commands1, state).a;
}

export function part2(input, state = { a: 12, b: 0, c: 0, d: 0, index: 0 }) {
  let commands2 = input.split('\n').map(toReducer);
  return run(commands2, state).a;
}
