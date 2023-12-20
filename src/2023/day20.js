function parse(input) {
  let parts = input.split('\n').map(line => {
    let [part, connectors] = line.split(' -> ');
    let type =
      part[0] === '%' ? 'flip' : part[0] === '&' ? 'conj' : 'broadcaster';
    if (type !== 'broadcaster') {
      part = part.slice(1);
    }
    connectors = connectors.split(', ');
    return [part, { part, type, connectors }];
  });
  parts = Object.fromEntries(parts);
  Object.values(parts).forEach(part => {
    if (part.type === 'flip') part.state = false;
    if (part.type === 'conj') {
      part.memory = {};
      Object.values(parts).forEach(x => {
        if (x.connectors.includes(part.part)) {
          part.memory[x.part] = 'low';
        }
      });
      part.memory;
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
    if (parts[part].type === 'broadcaster') {
      parts[part].connectors.forEach(connector => {
        queue.push({ part: connector, level, from: part });
      });
    }
    if (parts[part].type === 'flip' && level === 'low') {
      parts[part].state = !parts[part].state;
      parts[part].connectors.forEach(connector => {
        queue.push({
          part: connector,
          level: parts[part].state ? 'high' : 'low',
          from: part,
        });
      });
    }
    if (parts[part].type === 'conj') {
      parts[part].memory[from] = level;
      const allHigh = Object.values(parts[part].memory).every(
        x => x === 'high',
      );
      parts[part].connectors.forEach(connector => {
        queue.push({
          part: connector,
          level: allHigh ? 'low' : 'high',
          from: part,
        });
      });
    }
  }
  return count;
}

export function part1(input) {
  let parts = parse(input);
  let count = { low: 0, high: 0 };

  for (let i = 0; i < 1000; i++) {
    const result = signal(parts);
    count.low += result.low;
    count.high += result.high;
  }
  return count.low * count.high;
}

function wait(input, part, from) {
  let parts = parse(input);
  for (let i = 1; i < Infinity; i++) {
    try {
      signal(parts, `${part},high,${from}`);
    } catch {
      return i;
    }
  }
}
export function part2(input) {
  let parts = parse(input);
  const conj = Object.values(parts).find(x => x.connectors[0] === 'rx');
  return Object.keys(conj.memory).reduce(
    (acc, key) => acc * wait(input, conj.part, key),
    1,
  );
}
