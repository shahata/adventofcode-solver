function parse(input) {
  let parts = input.split("\n").map(line => {
    let [part, links] = line.split(" -> ");
    let type = part[0];
    if (type !== "b") part = part.slice(1);
    return [part, { part, type, links: links.split(", ") }];
  });
  parts = Object.fromEntries(parts);
  Object.values(parts).forEach(part => {
    if (part.type === "%") part.state = { on: false };
    if (part.type === "&") {
      let m = Object.values(parts).filter(x => x.links.includes(part.part));
      part.state = { memory: Object.fromEntries(m.map(x => [x.part, false])) };
    }
  });
  return parts;
}

function signal(parts, wait) {
  let queue = [{ part: "broadcaster", level: false, from: "button" }];
  let count = { low: 0, high: 0 };
  while (queue.length > 0) {
    let { part, level, from } = queue.shift();
    count[level ? "high" : "low"]++;

    if (`${part},${level},${from}` === wait) throw new Error("wait");
    if (parts[part]) {
      let { type, links, state } = parts[part];
      if (type === "%" && level) continue;
      if (type === "%") level = state.on = !state.on;
      if (type === "&") {
        state.memory[from] = level;
        level = !Object.values(state.memory).every(x => x);
      }
      links.forEach(link => queue.push({ part: link, level, from: part }));
    }
  }
  return count;
}

export function part1(input) {
  let parts = parse(input);
  let count = { low: 0, high: 0 };
  for (let i = 0; i < 1000; i++) {
    let result = signal(parts);
    count.low += result.low;
    count.high += result.high;
  }
  return count.low * count.high;
}

function wait(input, part, from) {
  let parts = parse(input);
  for (let i = 1; i < Infinity; i++) {
    try {
      signal(parts, `${part},true,${from}`);
    } catch {
      return i;
    }
  }
}

export function part2(input) {
  let parts = parse(input);
  let { part, state } = Object.values(parts).find(x => x.links[0] === "rx");
  let loops = Object.keys(state.memory).map(x => wait(input, part, x));
  return loops.reduce((acc, x) => acc * x, 1);
}
