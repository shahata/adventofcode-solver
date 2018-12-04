function calcSleep(input) {
  const lines = input
    .split('\n')
    .sort()
    .map(x => {
      const regex = /^\[([\d-]+) ([\d:]+)\] .* (#|asleep|up)(\d+)?/;
      const [, date, time, verb, id] = x.match(regex);
      return { date, time, verb, id };
    });
  const sleep = new Map();
  let current, start;
  lines.forEach(line => {
    if (line.verb === '#') {
      current = line.id;
    } else if (line.verb === 'asleep') {
      start = { date: line.date, time: line.time };
    } else {
      const guard = sleep.get(current) || {
        total: 0,
        mins: new Map(),
      };
      const a = parseInt(line.time.split(':').pop());
      const b = parseInt(start.time.split(':').pop());
      for (let i = b; i < a; i++) {
        guard.total += 1;
        guard.mins.set(i, (guard.mins.get(i) || 0) + 1);
      }
      sleep.set(current, guard);
    }
  });
  return sleep;
}

function sleepyMin(guard) {
  return Array.from(guard.mins.entries())
    .sort((a, b) => a[1] - b[1])
    .pop();
}

function sleepyGuard(sleep, fn) {
  return Array.from(sleep.entries())
    .sort((a, b) => fn(a[1], b[1]))
    .pop();
}

function part1(input) {
  const sleep = calcSleep(input);
  const sleepy = sleepyGuard(sleep, (a, b) => a.total - b.total);
  const min = sleepyMin(sleepy[1]);
  return min[0] * sleepy[0];
}

function part2(input) {
  const sleep = calcSleep(input);
  const sleepy = sleepyGuard(
    sleep,
    (a, b) => sleepyMin(a)[1] - sleepyMin(b)[1],
  );
  const min = sleepyMin(sleepy[1]);
  return min[0] * sleepy[0];
}

module.exports = { part1, part2 };
