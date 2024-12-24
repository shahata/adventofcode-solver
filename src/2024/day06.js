const step = {
  up: { x: 0, y: -1, turn: "right" },
  down: { x: 0, y: 1, turn: "left" },
  left: { x: -1, y: 0, turn: "up" },
  right: { x: 1, y: 0, turn: "down" },
};

function test({ map, current }, add = undefined) {
  let visited = new Set();
  let turns = new Set();
  if (add) map[add.y][add.x] = "#";
  map[current.y][current.x] = ".";
  while (map[current.y]?.[current.x]) {
    let next = { ...current };
    while (map[next.y]?.[next.x] === ".") {
      if (!add) visited.add(`${next.x},${next.y}`);
      next.x += step[current.direction].x;
      next.y += step[current.direction].y;
    }
    if (map[next.y]?.[next.x] === "#") {
      next.x -= step[current.direction].x;
      next.y -= step[current.direction].y;
      next.direction = step[current.direction].turn;
      if (turns.has(`${next.x},${next.y},${next.direction}`)) return turns;
      turns.add(`${next.x},${next.y},${next.direction}`);
    }
    current = next;
  }
  return add ? undefined : visited;
}

function parse(input) {
  let map = input.split("\n").map(line => line.split(""));
  let startY = map.findIndex(line => line.includes("^"));
  let startX = map[startY].indexOf("^");
  let current = { x: startX, y: startY, direction: "up" };
  return { map, current };
}

export function part1(input) {
  return test(parse(input)).size;
}

export function part2(input) {
  let count = 0;
  test(parse(input)).forEach(pos => {
    let [x, y] = pos.split(",").map(Number);
    if (test(parse(input), { x, y })) count++;
  });
  return count;
}
