export function part1(input) {
  let map = input.split("\n");
  let curr = 0;
  let beams = new Set([map[0].indexOf("S")]);
  let splits = 0;
  while (map[curr]) {
    let next = new Set();
    beams.forEach(x => {
      if (map[curr][x] === ".") {
        next.add(x);
      } else {
        if (map[curr][x - 1]) next.add(x - 1);
        if (map[curr][x + 1]) next.add(x + 1);
        splits++;
      }
    });
    beams = next;
    curr++;
  }
  return splits;
}

export function part2(input) {
  let map = input.split("\n");
  let curr = 0;
  let beams = new Map([[map[0].indexOf("S"), 1]]);
  let timelines = 1;
  while (map[curr]) {
    let next = new Map();
    function add(x, count) {
      let c = next.get(x) || 0;
      next.set(x, c + count);
    }
    beams.forEach((count, x) => {
      if (map[curr][x] === ".") {
        add(x, count);
      } else {
        if (map[curr][x - 1]) add(x - 1, count);
        if (map[curr][x + 1]) add(x + 1, count);
        timelines += count;
      }
    });
    beams = next;
    curr++;
  }
  return timelines;
}
