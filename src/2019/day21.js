import { execute } from './day09.js';

function run(input, commands) {
  const chars = [...commands, '']
    .join('\n')
    .split('')
    .map(x => x.charCodeAt(0));
  let output = [];

  const user = {
    input: () => chars.shift(),
    output: x => output.push(x),
    base: 0,
  };
  const ops = input.split(',').map(Number);
  let ip = 0;

  while (ops[ip] % 100 !== 99) {
    ip = execute(ops, ip, user);
  }

  //console.log(output.map(x => String.fromCharCode(x)).join(''));
  return output[output.length - 1];
}

export function part1(input) {
  const damage = run(input, [
    'NOT A J',
    'NOT B T',
    'OR J T',
    'NOT C J',
    'OR J T',
    'NOT D J',
    'NOT J J',
    'AND T J',
    'WALK',
  ]);
  return damage;
}

export function part2(input) {
  const damage = run(input, [
    'NOT A J',
    'NOT B T',
    'OR J T',
    'NOT C J',
    'OR J T',
    'NOT D J',
    'NOT J J',
    'AND T J',
    'AND E T',
    'OR H T',
    'AND T J',
    'RUN',
  ]);
  return damage;
}
