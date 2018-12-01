function parse(input) {
  let initial, diagnostic, currentState, currentValue;
  const lines = input.split('\n');
  const states = {};
  for (const line of lines) {
    const word = (line.match(/\w+/) || [])[0];
    const param = (line.match(/([^\s]*).$/) || [])[1];
    if (word === 'Begin') {
      initial = param;
    } else if (word === 'Perform') {
      diagnostic = parseInt(line.match(/(\d+) steps.$/)[1], 10);
    } else if (word === 'In') {
      currentState = param;
      states[currentState] = [];
    } else if (word === 'If') {
      currentValue = param;
      states[currentState][currentValue] = {};
    } else if (word === 'Write') {
      states[currentState][currentValue].write = param;
    } else if (word === 'Move') {
      states[currentState][currentValue].move = param;
    } else if (word === 'Continue') {
      states[currentState][currentValue].next = param;
    }
  }
  return { initial, diagnostic, states };
}

function part1(input) {
  const { initial, diagnostic, states } = parse(input);
  const tape = {};
  let position = 0,
    currentState = initial;
  for (let i = 0; i < diagnostic; i++) {
    const currentValue = tape[position] || '0';
    tape[position] = states[currentState][currentValue].write;
    position += states[currentState][currentValue].move === 'left' ? -1 : 1;
    currentState = states[currentState][currentValue].next;
  }
  return Object.values(tape).filter(x => x === '1').length;
}

module.exports = { part1, part2: () => undefined };
