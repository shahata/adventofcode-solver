function trim(next) {
  let prefix = next.state.match(/^\.*/).pop().length;
  next.start += prefix;
  next.state = next.state.replace(/^\.*/, "").replace(/\.*$/, "");
  return next;
}

function remember(next, current, memo, i) {
  memo[current.state] = {
    state: next.state,
    start: next.start - current.start,
    visit: { start: current.start, i },
  };
  return next;
}

function recall(current, memo, i) {
  return {
    state: memo[current.state].state,
    start: current.start + memo[current.state].start,
    loop: {
      size: i - memo[current.state].visit.i,
      diff: current.start - memo[current.state].visit.start,
    },
  };
}

function transform(current, transformations, memo, i) {
  current = trim(current);
  if (memo[current.state]) {
    return recall(current, memo, i);
  }
  current.start -= 5;
  current.state = `.....${current.state}.....`;
  let next = { start: current.start, state: ".." };
  for (let i = 0; i < current.state.length - 5; i++) {
    if (transformations[current.state.slice(i, i + 5)] === "#") {
      next.state += "#";
    } else {
      next.state += ".";
    }
  }
  return remember(trim(next), trim(current), memo, i);
}

export function part1(input, generations = 20) {
  let lines = input.split("\n");
  let [, initialState] = lines.shift().match(/([#.]+)/);
  let transformations = lines
    .slice(1)
    .map(x => x.split(" => "))
    .reduce((obj, [from, to]) => ({ ...obj, [from]: to }), {});

  let memo = {};
  let next = { start: 0, state: initialState };
  for (let i = 0; i < generations; i++) {
    next = transform(next, transformations, memo, i);
    if (next.loop) {
      let { diff, size } = next.loop;
      next.start += diff * Math.floor((generations - i - 1) / size);
      i += Math.floor((generations - i - 1) / size) * size;
    }
  }

  return next.state
    .split("")
    .map((x, i) => (x === "#" ? next.start + i : 0))
    .reduce((sum, x) => sum + x, 0);
}

export function part2(input) {
  return part1(input, 50000000000);
}
