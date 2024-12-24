export function part1(input) {
  let ids = input.split("\n");
  let counts = { double: 0, triple: 0 };
  ids.forEach(id => {
    let s = id.split("").sort().join("");
    if (s.match(/([a-z])\1\1\1+/)) {
      s = s.replace(/([a-z])\1\1\1+/g, "");
    }
    if (s.match(/([a-z])\1\1+/)) {
      counts.triple++;
      s = s.replace(/([a-z])\1\1+/g, "");
    }
    if (s.match(/([a-z])\1/)) {
      counts.double++;
    }
  });
  return counts.triple * counts.double;
}

export function part2(input) {
  let ids = input.split("\n");
  let memory = new Set();
  for (let id of ids) {
    let arr = id.split("");
    for (let i = 0; i < arr.length; i++) {
      let without = arr.map((x, index) => (index === i ? "*" : x)).join("");
      if (memory.has(without)) {
        return without.replace("*", "");
      } else {
        memory.add(without);
      }
    }
  }
}
