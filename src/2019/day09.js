function at(ops, ip, user, offset) {
  const mode = Math.floor(ops[ip] / Math.pow(10, offset + 1)) % 10;
  if (mode === 0) {
    return ops[ip + offset];
  } else if (mode === 1) {
    return ip + offset;
  } else if (mode === 2) {
    return user.base + ops[ip + offset];
  }
}

function get(ops, ip, user, offset) {
  return ops[at(ops, ip, user, offset)] || 0;
}

export function execute(ops, ip, user) {
  switch (ops[ip] % 100) {
    case 1:
      ops[at(ops, ip, user, 3)] = get(ops, ip, user, 1) + get(ops, ip, user, 2);
      return ip + 4;
    case 2:
      ops[at(ops, ip, user, 3)] = get(ops, ip, user, 1) * get(ops, ip, user, 2);
      return ip + 4;
    case 3:
      ops[at(ops, ip, user, 1)] = user.input();
      return ip + 2;
    case 4:
      user.output(get(ops, ip, user, 1));
      return ip + 2;
    case 5:
      return get(ops, ip, user, 1) !== 0 ? get(ops, ip, user, 2) : ip + 3;
    case 6:
      return get(ops, ip, user, 1) === 0 ? get(ops, ip, user, 2) : ip + 3;
    case 7:
      ops[at(ops, ip, user, 3)] =
        get(ops, ip, user, 1) < get(ops, ip, user, 2) ? 1 : 0;
      return ip + 4;
    case 8:
      ops[at(ops, ip, user, 3)] =
        get(ops, ip, user, 1) === get(ops, ip, user, 2) ? 1 : 0;
      return ip + 4;
    case 9:
      user.base += get(ops, ip, user, 1);
      return ip + 2;
  }
}

export function part1(input, inputValue = 1) {
  let output;
  const user = { input: () => inputValue, output: x => (output = x), base: 0 };
  const ops = input.split(',').map(x => +x);
  let ip = 0;

  while (ops[ip] % 100 !== 99) {
    ip = execute(ops, ip, user);
  }
  return output;
}

export function part2(input) {
  return part1(input, 2);
}
