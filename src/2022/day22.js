function calcHeading(direction) {
  if (direction === 0) return { x: 1, y: 0 };
  if (direction === 1) return { x: 0, y: 1 };
  if (direction === 2) return { x: -1, y: 0 };
  if (direction === 3) return { x: 0, y: -1 };
}

function wrapLogic1(maze, pos) {
  let heading = calcHeading(pos.direction);
  let opposite = { x: heading.x * -1, y: heading.y * -1 };
  let wrap = { ...pos };
  while (
    maze[wrap.y + opposite.y]?.[wrap.x + opposite.x] === "." ||
    maze[wrap.y + opposite.y]?.[wrap.x + opposite.x] === "#"
  ) {
    wrap.x += opposite.x;
    wrap.y += opposite.y;
  }
  return wrap;
}

function wrapLogic2(squares, width) {
  return (maze, pos) => {
    let offset = { x: pos.x % width, y: pos.y % width };
    let mirror = { x: width - offset.x - 1, y: width - offset.y - 1 };
    let [i, direction] = squares.find(
      square => square.x === pos.x - offset.x && square.y === pos.y - offset.y,
    ).wrap[pos.direction];
    let pair = [pos.direction, direction].sort().join("");
    let next;
    if (["02", "11", "33"].includes(pair)) next = { x: offset.x, y: mirror.y };
    if (["00", "13", "22"].includes(pair)) next = { x: mirror.x, y: offset.y };
    if (["03", "12"].includes(pair)) next = { x: offset.y, y: offset.x };
    if (["01", "23"].includes(pair)) next = { x: mirror.y, y: mirror.x };
    return { x: squares[i].x + next.x, y: squares[i].y + next.y, direction };
  };
}

function walk(maze, pos, steps, wrapLogic) {
  for (; steps > 0; steps--) {
    let heading = calcHeading(pos.direction);
    let next = { ...pos };
    next.x += heading.x;
    next.y += heading.y;
    if (maze[next.y]?.[next.x] !== "." && maze[next.y]?.[next.x] !== "#") {
      next = wrapLogic(maze, pos);
    }
    if (maze[next.y][next.x] === "#") break;
    pos = next;
  }
  return pos;
}

export function part1(input, wrapLogic = wrapLogic1) {
  let [maze, directions] = input.split("\n\n");
  let pos = { x: 0, y: 0, direction: 0 };
  maze = maze.split("\n");
  directions = directions.replace(/(R|L)/g, ",$1,").split(",");
  while (maze[pos.y][pos.x] !== ".") pos.x++;
  while (directions.length > 0) {
    let next = directions.shift();
    if (next === "R") pos.direction = (pos.direction + 1) % 4;
    if (next === "L") pos.direction = (4 + pos.direction - 1) % 4;
    if (Number.isInteger(+next)) pos = walk(maze, pos, +next, wrapLogic);
  }
  return (pos.y + 1) * 1000 + (pos.x + 1) * 4 + pos.direction;
}

export function part2(input) {
  if (input.length > 200) {
    let squares = [
      { x: 50, y: 0, wrap: [null, null, [4, 0], [5, 0]] },
      { x: 100, y: 0, wrap: [[3, 2], [2, 2], null, [5, 3]] },
      { x: 50, y: 50, wrap: [[1, 3], null, [4, 1], null] },
      { x: 50, y: 100, wrap: [[1, 2], [5, 2], null, null] },
      { x: 0, y: 100, wrap: [null, null, [0, 0], [2, 0]] },
      { x: 0, y: 150, wrap: [[3, 3], [1, 1], [0, 1], null] },
    ];
    return part1(input, wrapLogic2(squares, 50));
  } else {
    let squares = [
      { x: 8, y: 0, wrap: [[5, 2], null, [2, 1], [1, 1]] },
      { x: 0, y: 4, wrap: [null, [4, 3], [5, 3], [0, 1]] },
      { x: 4, y: 4, wrap: [null, [4, 0], null, [0, 0]] },
      { x: 8, y: 4, wrap: [[5, 1], null, null, null] },
      { x: 8, y: 8, wrap: [null, [1, 3], [2, 3], null] },
      { x: 12, y: 8, wrap: [[0, 2], [1, 0], null, [3, 2]] },
    ];
    return part1(input, wrapLogic2(squares, 4));
  }
}
