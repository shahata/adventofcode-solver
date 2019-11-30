export function getter(state, p) {
  if (typeof p === 'string') {
    if (state[p] === undefined) {
      state[p] = 0;
    }
    return state[p];
  } else {
    return p;
  }
}

export function parse(input, ops2 = {}, debug) {
  const ops = {
    snd: p1 => state => (state.sound = getter(state, p1)),
    set: (p1, p2) => state => (state[p1] = getter(state, p2)),
    add: (p1, p2) => state =>
      (state[p1] = getter(state, p1) + getter(state, p2)),
    mul: (p1, p2) => state =>
      (state[p1] = getter(state, p1) * getter(state, p2)),
    mod: (p1, p2) => state =>
      (state[p1] = getter(state, p1) % getter(state, p2)),
    rcv: p1 => state =>
      getter(p1) !== 0 ? (state.recovered = state.sound) : null,
    jgz: (p1, p2) => state =>
      getter(state, p1) > 0
        ? (state.instruction += getter(state, p2) - 1)
        : null,
    ...ops2,
  };

  return input.split('\n').map(str => {
    const [cmd, p1Str, p2Str] = str.split(' ');
    const p1 = p1Str.match(/^-?\d+$/) ? parseInt(p1Str, 10) : p1Str;
    const p2 = p2Str && p2Str.match(/^-?\d+$/) ? parseInt(p2Str, 10) : p2Str;
    return state => (!debug || debug(cmd)) && ops[cmd](p1, p2)(state);
  });
}

function parse2(input) {
  return parse(input, {
    snd: p1 => state => {
      state.send.push(getter(state, p1));
      state.sent++;
    },
    rcv: p1 => state => {
      if (state.queue.length > 0) {
        state[p1] = state.queue.shift();
      } else {
        throw new Error('waiting...');
      }
    },
  });
}

export function part1(input) {
  const commands = parse(input);
  const state = { instruction: 0 };
  while (state.instruction < commands.length && !state.recovered) {
    commands[state.instruction](state);
    state.instruction++;
  }
  return state.recovered;
}

function execute(commands, state) {
  let run = 0;
  try {
    while (state.instruction < commands.length) {
      commands[state.instruction](state);
      state.instruction++;
      run++;
    }
  } catch (e) {}
  return run;
}

export function part2(input) {
  const commands = parse2(input);
  const state1 = { instruction: 0, queue: [], sent: 0, p: 0 };
  const state2 = { instruction: 0, queue: [], sent: 0, p: 1 };
  state1.send = state2.queue;
  state2.send = state1.queue;

  let running = true;
  while (running) {
    running = execute(commands, state1) > 0 || execute(commands, state2) > 0;
  }
  return state2.sent;
}
