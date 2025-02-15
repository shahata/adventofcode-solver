function next(stone) {
  if (stone === 0) return [1];
  if (`${stone}`.length % 2 === 0) {
    let s = `${stone}`;
    return [
      parseInt(s.slice(0, s.length / 2)),
      parseInt(s.slice(s.length / 2)),
    ];
  }
  return [stone * 2024];
}

let memory = new Map();
function doit(stone, times) {
  let key = `${stone},${times}`;
  if (memory.has(key)) return memory.get(key);
  let sum = 0;
  let stones = next(stone);
  if (times === 1) sum = stones.length;
  else stones.forEach(stone => (sum += doit(stone, times - 1)));
  memory.set(key, sum);
  return sum;
}

export function part1(input) {
  let stones = input.split(" ").map(Number);
  return stones.reduce((sum, stone) => sum + doit(stone, 25), 0);
}

export function part2(input) {
  let stones = input.split(" ").map(Number);
  return stones.reduce((sum, stone) => sum + doit(stone, 75), 0);
}
