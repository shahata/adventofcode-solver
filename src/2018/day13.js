const position = cart => `${cart.position.x},${cart.position.y}`;

const onMove = {
  '>': cart => cart.position.x++,
  '<': cart => cart.position.x--,
  '^': cart => cart.position.y--,
  v: cart => cart.position.y++,
};

const onSlash = {
  '>': '^',
  '<': 'v',
  '^': '>',
  v: '<',
};

const onBackSlash = {
  '>': 'v',
  '<': '^',
  '^': '<',
  v: '>',
};

const onTurn = {
  left: {
    '>': '^',
    '<': 'v',
    '^': '<',
    v: '>',
  },
  right: {
    '>': 'v',
    '<': '^',
    '^': '>',
    v: '<',
  },
  straight: {
    '>': '>',
    '<': '<',
    '^': '^',
    v: 'v',
  },
};

const nextTurn = {
  left: 'straight',
  straight: 'right',
  right: 'left',
};

function tick(map, carts) {
  carts.sort((a, b) =>
    a.position.y === b.position.y
      ? a.position.x - b.position.x
      : a.position.y - b.position.y,
  );
  const collisions = [];
  for (const cart of carts) {
    onMove[cart.direction](cart);
    if (map[cart.position.y][cart.position.x] === '/') {
      cart.direction = onSlash[cart.direction];
    } else if (map[cart.position.y][cart.position.x] === '\\') {
      cart.direction = onBackSlash[cart.direction];
    } else if (map[cart.position.y][cart.position.x] === '+') {
      cart.direction = onTurn[cart.nextTurn][cart.direction];
      cart.nextTurn = nextTurn[cart.nextTurn];
    }
    const other = carts.find(x => x !== cart && position(x) === position(cart));
    if (other) {
      collisions.push(cart, other);
    }
  }
  return collisions;
}

function parse(input) {
  const map = input
    .replace(/[v^]/g, '|')
    .replace(/[<>]/g, '-')
    .split('\n');
  const carts = [];
  input.split('\n').forEach((row, y) =>
    row.split('').forEach((cell, x) => {
      if ('v^<>'.includes(cell)) {
        carts.push({
          direction: cell,
          nextTurn: 'left',
          position: { x, y },
        });
      }
    }),
  );
  return { map, carts };
}

function part1(input) {
  const { map, carts } = parse(input);
  let collisions = [];
  while (collisions.length === 0) {
    collisions = tick(map, carts);
  }
  return position(collisions[0]);
}

function part2(input) {
  const { map, carts } = parse(input);
  while (carts.length > 1) {
    const collisions = tick(map, carts);
    collisions.forEach(cart => carts.splice(carts.indexOf(cart), 1));
  }
  return position(carts[0]);
}

module.exports = { part1, part2 };
