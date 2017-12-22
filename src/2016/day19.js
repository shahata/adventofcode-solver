// Naive implementation of part 1
//
// function solve1(count) {
//   let elves = new Array(count).fill().map((x, i) => i + 1);
//   while (elves.length > 1) {
//     const length = elves.length;
//     elves = elves.filter((x, i) => i % 2 === 0);
//     if (length % 2 === 1) {
//       elves.shift();
//     }
//   }
//   return elves.shift();
// }

function solve1(count) {
  // https://www.youtube.com/watch?v=uCsD3ZGzMgE
  const binary = count.toString(2);
  return parseInt(binary.slice(1) + binary.slice(0, 1), 2);
}

// Super slow solution which helped in understanding the pattern
//
// function solve2(count) {
//   const elves = new Array(count).fill().map((x, i) => i + 1);
//   const originalLength = elves.length;
//   let next = 0;
//   while (elves.length > 1) {
//     const from = (next + Math.floor(elves.length / 2)) % elves.length;
//     elves.splice(from, 1);
//     if (from < next) {
//       next--;
//     }
//     next = (next + 1) % elves.length;
//   }
//   return elves.shift();
// }

function solve2(count) {
  const pow = 3 ** (count.toString(3).length - 1);
  if (pow === count) {
    return count;
  } else if (count <= pow * 2) {
    return count - pow;
  } else {
    return (count - pow) + (count - (pow * 2));
  }
}

const part1 = input => solve1(parseInt(input, 10));
const part2 = input => solve2(parseInt(input, 10));

module.exports = {part1, part2};
