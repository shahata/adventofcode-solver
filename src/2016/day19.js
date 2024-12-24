// Naive implementation of part 1
//
// function solve1(count) {
//   let elves = new Array(count).fill().map((x, i) => i + 1);
//   while (elves.length > 1) {
//     let length = elves.length;
//     elves = elves.filter((x, i) => i % 2 === 0);
//     if (length % 2 === 1) {
//       elves.shift();
//     }
//   }
//   return elves.shift();
// }

function solve1(count) {
  // https://www.youtube.com/watch?v=uCsD3ZGzMgE
  let binary = count.toString(2);
  return parseInt(binary.slice(1) + binary.slice(0, 1), 2);
}

// Super slow solution which helped in understanding the pattern
//
// function solve2(count) {
//   let elves = new Array(count).fill().map((x, i) => i + 1);
//   let originalLength = elves.length;
//   let next = 0;
//   while (elves.length > 1) {
//     let from = (next + Math.floor(elves.length / 2)) % elves.length;
//     elves.splice(from, 1);
//     if (from < next) {
//       next--;
//     }
//     next = (next + 1) % elves.length;
//   }
//   return elves.shift();
// }

function solve2(count) {
  let pow = 3 ** (count.toString(3).length - 1);
  if (pow === count) {
    return count;
  } else if (count <= pow * 2) {
    return count - pow;
  } else {
    return count - pow + (count - pow * 2);
  }
}

export function part1(input) {
  return solve1(+input);
}

export function part2(input) {
  return solve2(+input);
}
