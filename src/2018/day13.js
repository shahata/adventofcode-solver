const position = cart => `${cart.x},${cart.y}`;
const onSlash = { ">": "^", "<": "v", "^": ">", "v": "<" };
const onBackSlash = { ">": "v", "<": "^", "^": "<", "v": ">" };
const nextTurn = { left: "straight", straight: "right", right: "left" };
const onTurn = {
  left: { ">": "^", "<": "v", "^": "<", "v": ">" },
  right: { ">": "v", "<": "^", "^": ">", "v": "<" },
  straight: { ">": ">", "<": "<", "^": "^", "v": "v" },
};
const onMove = {
  ">": c => c.x++,
  "<": c => c.x--,
  "^": c => c.y--,
  "v": c => c.y++,
};

function tick(map, carts) {
  const collisions = [];
  carts.sort((a, b) => a.y - b.y || a.x - b.x);
  carts.forEach(cart => {
    onMove[cart.direction](cart);
    if (map[cart.y][cart.x] === "/") {
      cart.direction = onSlash[cart.direction];
    } else if (map[cart.y][cart.x] === "\\") {
      cart.direction = onBackSlash[cart.direction];
    } else if (map[cart.y][cart.x] === "+") {
      cart.direction = onTurn[cart.nextTurn][cart.direction];
      cart.nextTurn = nextTurn[cart.nextTurn];
    }
    const other = carts.find(x => x !== cart && position(x) === position(cart));
    if (other) {
      collisions.push(cart, other);
    }
  });
  return collisions;
}

function parse(input) {
  const carts = [];
  const map = input.replace(/[v^]/g, "|").replace(/[<>]/g, "-").split("\n");
  input.split("\n").forEach((row, y) =>
    row.split("").forEach((cell, x) => {
      if ("v^<>".includes(cell)) {
        carts.push({ direction: cell, nextTurn: "left", x, y });
      }
    }),
  );
  return { map, carts };
}

export function part1(input) {
  const { map, carts } = parse(input);
  let collisions = [];
  while (collisions.length === 0) {
    collisions = tick(map, carts);
  }
  return position(collisions[0]);
}

export function part2(input) {
  const { map, carts } = parse(input);
  while (carts.length > 1) {
    const collisions = tick(map, carts);
    collisions.forEach(cart => carts.splice(carts.indexOf(cart), 1));
  }
  return position(carts[0]);
}
