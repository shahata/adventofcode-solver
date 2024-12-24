export function part1(input) {
  let lines = input.split("\n").map(x => x.split(" | ")[1].split(" "));
  return lines.flat().filter(x => x.length !== 5 && x.length !== 6).length;
}

export function part2(input) {
  let lines = input.split("\n").map(x => x.split(" | "));
  return lines
    .map(l => l.map(d => d.split(" ").map(d => d.split("").sort().join(""))))
    .reduce((prev, [patterns, output]) => {
      let len = n => d => d.length === n;
      let has = (p, n) => d => [...p].filter(c => d.includes(c)).length === n;
      let d1 = patterns.find(len(2));
      let d4 = patterns.find(len(4));
      let d7 = patterns.find(len(3));
      let d8 = patterns.find(len(7));
      let d6 = patterns.filter(len(6)).find(has(d1, 1));
      let d9 = patterns.filter(len(6)).find(has(d4, 4));
      let d5 = patterns.filter(len(5)).find(has(d6, 5));
      let d2 = patterns.filter(len(5)).find(has(d9, 4));
      let d0 = patterns.filter(len(6)).find(d => d !== d6 && d !== d9);
      let d3 = patterns.filter(len(5)).find(d => d !== d2 && d !== d5);
      let map = [d0, d1, d2, d3, d4, d5, d6, d7, d8, d9];
      return Number(output.map(d => map.indexOf(d)).join("")) + prev;
    }, 0);
}
