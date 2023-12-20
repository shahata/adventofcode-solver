function parse(input) {
  let parts = input.split('\n').map(line => {
    let [part, links] = line.split(' -> ');
    let type = part[0];
    if (type !== 'b') part = part.slice(1);
    links = links.split(', ');
    return [part, { part, type, links }];
  });
  parts = Object.fromEntries(parts);
  Object.values(parts).forEach(part => {
    if (part.type === '%') part.state = 'low';
    if (part.type === '&') {
      const linked = Object.values(parts).filter(x =>
        x.links.includes(part.part),
      );
      part.memory = Object.fromEntries(linked.map(x => [x.part, 'low']));
    }
  });
  return parts;
}

function signal(parts, wait) {
  const queue = [{ part: 'broadcaster', level: 'low', from: 'button' }];
  let count = { low: 0, high: 0 };
  while (queue.length > 0) {
    const { part, level, from } = queue.shift();
    count[level]++;

    if (`${part},${level},${from}` === wait) throw new Error('wait');
    if (!parts[part]) continue;
    if (parts[part].type === 'b') {
      parts[part].links.forEach(link => {
        queue.push({ part: link, level, from: part });
      });
    }
    if (parts[part].type === '%' && level === 'low') {
      parts[part].state = parts[part].state === 'low' ? 'high' : 'low';
      parts[part].links.forEach(link => {
        queue.push({ part: link, level: parts[part].state, from: part });
      });
    }
    if (parts[part].type === '&') {
      parts[part].memory[from] = level;
      const allHigh = Object.values(parts[part].memory).every(
        x => x === 'high',
      );
      parts[part].links.forEach(link => {
        queue.push({ part: link, level: allHigh ? 'low' : 'high', from: part });
      });
    }
  }
  return count;
}

export function part1(input) {
  const parts = parse(input);
  const count = { low: 0, high: 0 };
  for (let i = 0; i < 1000; i++) {
    const result = signal(parts);
    count.low += result.low;
    count.high += result.high;
  }
  return count.low * count.high;
}

function wait(input, part, from) {
  const parts = parse(input);
  for (let i = 1; i < Infinity; i++) {
    try {
      signal(parts, `${part},high,${from}`);
    } catch {
      return i;
    }
  }
}

export function part2(input) {
  const parts = parse(input);
  const conj = Object.values(parts).find(x => x.links[0] === 'rx');
  const loops = Object.keys(conj.memory).map(x => wait(input, conj.part, x));
  return loops.reduce((acc, x) => acc * x, 1);
}
