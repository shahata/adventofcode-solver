import { PriorityQueue } from "@datastructures-js/priority-queue";

function jump(map, { x, y, total, d, s }, minSteps) {
  for (; s < minSteps; s++) {
    total += map[y]?.[x] || 0;
    if (d === "right") x++;
    if (d === "left") x--;
    if (d === "up") y--;
    if (d === "down") y++;
  }
  return { x, y, total, d, s };
}

function getNext(current, map, minSteps, maxSteps) {
  const next = [];
  const { x, y, total, d, s } = current;
  if (s < maxSteps) {
    if (d === "right") next.push({ x: x + 1, y, d: "right", s: s + 1, total });
    if (d === "left") next.push({ x: x - 1, y, d: "left", s: s + 1, total });
    if (d === "up") next.push({ x, y: y - 1, d: "up", s: s + 1, total });
    if (d === "down") next.push({ x, y: y + 1, d: "down", s: s + 1, total });
  }
  if (s >= minSteps && (d === "right" || d === "left")) {
    next.push({ x, y: y - 1, d: "up", s: 1, total });
    next.push({ x, y: y + 1, d: "down", s: 1, total });
  }
  if (s >= minSteps && (d === "up" || d === "down")) {
    next.push({ x: x - 1, y, d: "left", s: 1, total });
    next.push({ x: x + 1, y, d: "right", s: 1, total });
  }
  return next
    .map(n => (n.s < minSteps ? jump(map, n, minSteps) : n))
    .filter(({ x, y }) => map[y]?.[x] !== undefined)
    .map(n => ({ ...n, total: n.total + map[n.y][n.x] }));
}

export function part1(input, minSteps = 0, maxSteps = 3) {
  const map = input.split("\n").map(line => line.split("").map(Number));
  const key = ({ x, y, d, s }) => `${x},${y},${d},${s}`;
  const compare = (a, b) => a.x + a.y - (b.x + b.y) || a.total - b.total;
  const queue = new PriorityQueue(compare, [
    { x: 0, y: 0, total: 0, d: "right", s: 0 },
    { x: 0, y: 0, total: 0, d: "down", s: 0 },
  ]);
  const visited = new Map(queue.toArray().map(n => [key(n), n]));
  let min = Infinity;
  while (queue.size() > 0) {
    const current = queue.dequeue();
    if (current.x === map[0].length - 1 && current.y === map.length - 1) {
      min = Math.min(min, current.total);
      continue;
    }
    if (current.total >= min) continue;
    const next = getNext(current, map, minSteps, maxSteps).filter(
      n => !visited.has(key(n)) || visited.get(key(n)).total > n.total,
    );
    next.forEach(n => {
      visited.set(key(n), n);
      queue.enqueue(n);
    });
  }
  return min;
}

export function part2(input) {
  return part1(input, 4, 10);
}
