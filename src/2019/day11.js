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

function move(position, direction) {
  switch (direction) {
    case '^':
      return { x: position.x, y: position.y - 1 };
    case 'v':
      return { x: position.x, y: position.y + 1 };
    case '<':
      return { x: position.x - 1, y: position.y };
    case '>':
      return { x: position.x + 1, y: position.y };
    default:
      console.log(direction);
  }
}

const left = {
  '^': '<',
  '<': 'v',
  v: '>',
  '>': '^',
};

const right = {
  '^': '>',
  '>': 'v',
  v: '<',
  '<': '^',
};

export function part1(input, map = {}) {
  let direction = '^';
  let position = { x: 0, y: 0 };
  let outputMode = true;

  function write(value) {
    if (outputMode) {
      map[`${position.x},${position.y}`].value = value;
      map[`${position.x},${position.y}`].writes++;
    } else {
      direction = value === 0 ? left[direction] : right[direction];
      position = move(position, direction);
    }
    outputMode = !outputMode;
  }

  function read() {
    map[`${position.x},${position.y}`] = map[`${position.x},${position.y}`] || {
      value: 0,
      writes: 0,
    };
    return map[`${position.x},${position.y}`].value;
  }

  const user = { input: read, output: write, base: 0 };
  const ops = input.split(',').map(x => parseInt(x));
  let ip = 0;

  while (ops[ip] % 100 !== 99) {
    ip = execute(ops, ip, user);
  }
  return Object.values(map).length;
}

export function part2(input) {
  const map = { '0,0': { value: 1, writes: 0 } };
  part1(input, map);

  const coordinates = Object.keys(map)
    .map(k => k.split(',').map(i => parseInt(i)))
    .sort((a, b) => a[1] - b[1] || a[0] - b[0]);
  const first = coordinates[0];
  const last = coordinates[coordinates.length - 1];
  const lines = [''];
  for (let y = first[1]; y <= last[1]; y++) {
    let line = '';
    for (let x = first[0]; x <= last[0]; x++) {
      line += map[`${x},${y}`] && map[`${x},${y}`].value === 1 ? '#' : ' ';
    }
    lines.push(line);
  }
  return lines.join('\n');
}
