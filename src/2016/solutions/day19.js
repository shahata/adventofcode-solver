function solve(elves) {
  while (elves.length > 1) {
    const length = elves.length;
    elves = elves.filter((x, i) => i % 2 === 0);
    if (length % 2 === 1) {
      elves.shift();
    }
  }
  return elves.shift();
}

// function solve(elves) {
//   let next = 0;
//   while (elves.length > 1) {
//     const from = (next + 1) % elves.length;
//     elves.splice(from, 1);
//     if (from < next) {
//       next--;
//     }
//     next = (next + 1) % elves.length;
//   }
//   return elves.shift();
// }

function day(input) {
  const elves = new Array(parseInt(input, 10)).fill().map((x, i) => i + 1);
  const part1 = solve(elves);
  const part2 = input;
  return [part1, part2];
}

module.exports = {day};
