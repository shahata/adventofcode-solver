import { part2 as knot } from "./day10.js";

function parse(input) {
  return new Array(128).fill().map((x, y) => {
    return knot(`${input}-${y}`)
      .split("")
      .map(x => {
        return parseInt(x, 16).toString(2).padStart(4, "0");
      })
      .join("")
      .split("")
      .map((d, x) => ({ x, y, value: d === "1" ? "#" : "." }));
  });
}

function countUsed(disk) {
  return disk.reduce(
    (total, row) => total + row.filter(x => x.value === "#").length,
    0,
  );
}

function toKey({ x, y }) {
  return `${x}-${y}`;
}

function getNeighbors(disk, { x, y }) {
  return [
    { x: x + 0, y: y - 1 },
    { x: x + 0, y: y + 1 },
    { x: x - 1, y: y + 0 },
    { x: x + 1, y: y + 0 },
  ]
    .map(point => disk[point.y] && disk[point.y][point.x])
    .filter(x => x);
}

function count(disk, point, visited = new Set()) {
  visited.add(toKey(point));
  getNeighbors(disk, point)
    .filter(x => {
      return !visited.has(toKey(x)) && x.value === "#";
    })
    .forEach(x => count(disk, x, visited));
  return visited;
}

function countRegions(disk) {
  let regions = 0;
  const visited = new Set();
  disk.forEach(row => {
    row.forEach(point => {
      if (!visited.has(toKey(point)) && point.value === "#") {
        regions++;
        count(disk, point, visited);
      }
    });
  });
  return regions;
}

export function part1(input) {
  return countUsed(parse(input));
}

export function part2(input) {
  return countRegions(parse(input));
}
