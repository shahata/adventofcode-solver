export function part1(input) {
  const ids = input.split("\n");
  const counts = { double: 0, triple: 0 };
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
  const ids = input.split("\n");
  const memory = new Set();
  for (const id of ids) {
    const arr = id.split("");
    for (let i = 0; i < arr.length; i++) {
      const without = arr.map((x, index) => (index === i ? "*" : x)).join("");
      if (memory.has(without)) {
        return without.replace(/\*/g, "");
      } else {
        memory.add(without);
      }
    }
  }
}
