export function part1(input) {
  let password = 0;
  input
    .split("\n")
    .map(x => {
      let [, direction, count] = x.match(/(L|R)(\d+)/);
      return { direction, count: +count };
    })
    .reduce((prev, curr) => {
      if (curr.direction === "L") prev -= curr.count;
      if (curr.direction === "R") prev += curr.count;
      while (prev < 0) prev += 100;
      while (prev >= 100) prev -= 100;
      if (prev === 0) password++;
      return prev;
    }, 50);

  return password;
}

export function part2(input) {
  let password = 0;
  input
    .split("\n")
    .map(x => {
      let [, direction, count] = x.match(/(L|R)(\d+)/);
      return { direction, count: +count };
    })
    .reduce((prev, curr) => {
      if (curr.direction === "L") {
        for (let i = 0; i < curr.count; i++) {
          prev--;
          if (prev === 0) password++;
          if (prev === -1) prev = 99;
        }
      }
      if (curr.direction === "R") {
        for (let i = 0; i < curr.count; i++) {
          prev++;
          if (prev === 100) prev = 0;
          if (prev === 0) password++;
        }
      }
      return prev;
    }, 50);

  return password;
}
