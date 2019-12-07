function get(ops, ip, offset) {
  const mode = Math.floor(ops[ip] / Math.pow(10, offset + 1)) % 10;
  return mode === 0 ? ops[ops[ip + offset]] : ops[ip + offset];
}

export function execute(ops, ip, user) {
  switch (ops[ip] % 100) {
    case 1:
      ops[ops[ip + 3]] = get(ops, ip, 1) + get(ops, ip, 2);
      return ip + 4;
    case 2:
      ops[ops[ip + 3]] = get(ops, ip, 1) * get(ops, ip, 2);
      return ip + 4;
    case 3:
      ops[ops[ip + 1]] = user.input.shift();
      return ip + 2;
    case 4:
      user.output = get(ops, ip, 1);
      return ip + 2;
    case 5:
      return get(ops, ip, 1) !== 0 ? get(ops, ip, 2) : ip + 3;
    case 6:
      return get(ops, ip, 1) === 0 ? get(ops, ip, 2) : ip + 3;
    case 7:
      ops[ops[ip + 3]] = get(ops, ip, 1) < get(ops, ip, 2) ? 1 : 0;
      return ip + 4;
    case 8:
      ops[ops[ip + 3]] = get(ops, ip, 1) === get(ops, ip, 2) ? 1 : 0;
      return ip + 4;
  }
}

export function part1(input, inputValue = 1) {
  const user = { input: [inputValue], output: undefined };
  const ops = input.split(',').map(x => parseInt(x));
  let ip = 0;

  while (ops[ip] % 100 !== 99) {
    ip = execute(ops, ip, user);
  }
  return user.output;
}

export function part2(input, inputValue = 5) {
  return part1(input, inputValue);
}
