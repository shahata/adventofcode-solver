function solve(lines) {
  let pos = { x: 0, y: 0 };
  let outline = 0;
  let area = 0;

  for (let { direction, count } of lines) {
    let next;
    if (direction === "L") next = { x: pos.x - count, y: pos.y };
    if (direction === "R") next = { x: pos.x + count, y: pos.y };
    if (direction === "U") next = { x: pos.x, y: pos.y - count };
    if (direction === "D") next = { x: pos.x, y: pos.y + count };
    area += (pos.x * next.y - pos.y * next.x) / 2; //shoelace formula
    outline += count;
    pos = next;
  }
  let innerArea = Math.abs(area) - (outline / 2 - 1); //pick's theorem
  return innerArea + outline;
}

export function part1(input) {
  let lines = input.split("\n").map(line => {
    let [direction, count] = line.split(" ");
    return { direction, count: +count };
  });
  return solve(lines);
}

export function part2(input) {
  let lines = input.split("\n").map(line => {
    let [, , color] = line.split(" ");
    let count = parseInt(color.slice(2, -2), 16);
    let direction = "RDLU".at(color.slice(-2, -1));
    return { direction, count };
  });
  return solve(lines);
}
