function next(stone) {
  if (stone === 0) {
    return [1];
  }
  if (`${stone}`.length % 2 === 0) {
    const s = `${stone}`;
    return [
      parseInt(s.slice(0, s.length / 2)),
      parseInt(s.slice(s.length / 2)),
    ];
  }
  return [stone * 2024];
}

const memory = new Map();
function do25(stone) {
  if (memory.has(stone)) return memory.get(stone);
  let stones = [stone];
  for (let j = 0; j < 25; j++) stones = stones.flatMap(next);
  memory.set(stone, stones);
  return stones;
}

// function doit(stone, times = 25) {
//   if (times === 0) return 1;

//   const key = `${stone},${times}`;
//   if (memory.has(key)) return memory.get(key);
//   let sum = 0;
//   let stones = next(stone);
//   stones.forEach(stone => {
//     sum += doit(stone, times - 1);
//   });
//   memory.set(key, sum);
//   return sum;
// }

export function part1(input) {
  let stones = input.split(" ").map(Number);
  let sum = 0;
  stones.forEach(stone => {
    sum += do25(stone).length;
  });
  return sum;
}

export function part2(input) {
  let stones = input.split(" ").map(Number);
  let sum = 0;
  stones.forEach(stone => {
    do25(stone).forEach(stone => {
      do25(stone).forEach(stone => {
        sum += do25(stone).length;
      });
    });
  });
  return sum;
}
