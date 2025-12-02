function parse(input) {
  return input.split("\n").map(x => {
    let [, direction, count] = x.match(/(L|R)(\d+)/);
    return { direction: direction === "L" ? -1 : 1, count: +count };
  });
}

export function part1(input) {
  let password = 0;
  parse(input).reduce((prev, curr) => {
    let next = (prev + curr.direction * curr.count) % 100;
    if (next < 0) next += 100;
    if (next === 0) password++;
    return next;
  }, 50);
  return password;
}

export function part2(input) {
  let password = 0;
  parse(input).reduce((prev, curr) => {
    for (let i = 0; i < curr.count; i++) {
      prev += curr.direction;
      if (prev === -1) prev = 99;
      if (prev === 100) prev = 0;
      if (prev === 0) password++;
    }
    return prev;
  }, 50);
  return password;
}
