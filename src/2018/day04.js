function calcSleep(input) {
  let lines = input
    .split("\n")
    .sort()
    .map(x => {
      let regex = /^\[[\d-]+ \d+:([\d]+)\] .* (#|asleep|up)(\d+)?/;
      let [, time, verb, id] = x.match(regex);
      return { time: +time, verb, id };
    });
  let sleep = new Map();
  let initial = () => ({ total: 0, mins: new Map() });
  let current, start;
  lines.forEach(line => {
    if (line.verb === "#") {
      current = line.id;
    } else if (line.verb === "asleep") {
      start = line.time;
    } else {
      let guard = sleep.get(current) || initial();
      for (let i = start; i < line.time; i++) {
        guard.total++;
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

function checksum(input, fn) {
  let sleep = calcSleep(input);
  let sleepy = sleepyGuard(sleep, fn);
  let min = sleepyMin(sleepy[1]);
  return min[0] * sleepy[0];
}

export function part1(input) {
  return checksum(input, (a, b) => a.total - b.total);
}

export function part2(input) {
  return checksum(input, (a, b) => sleepyMin(a)[1] - sleepyMin(b)[1]);
}
