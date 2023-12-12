function memoize(fn) {
  const memo = {};
  return function (...x) {
    const s = JSON.stringify(x);
    return (memo[s] = memo[s] ?? fn(...x));
  };
}

function advance(options, char) {
  const { len, groups, i, left } = options;
  let update = {};
  if (char === '#') update = { len: len + 1, left: left - 1 };
  else if (len > 0) update = { len: 0, groups: [...groups, len] };
  return { ...options, ...update, i: i + 1 };
}

const solve = memoize((pattern, counts, options) => {
  options = options || { groups: [], len: 0, i: 0 };
  options.left = options.left ?? counts.reduce((a, b) => a + b, 0);

  if (options.i >= pattern.length) {
    if (options.len > 0) options.groups = [...options.groups, options.len];
    if (options.groups.length !== counts.length) return 0;
    return options.groups.every((x, i) => x === counts[i]) ? 1 : 0;
  } else {
    if (options.groups.some((x, i) => x !== counts[i])) return 0;
    if (options.len > counts[options.groups.length]) return 0;
    if (options.left > pattern.length - options.i) return 0;
  }

  let result = 0;
  const c = pattern[options.i];
  if (c !== '#') result += solve(pattern, counts, advance(options, '.'));
  if (c !== '.') result += solve(pattern, counts, advance(options, '#'));
  return result;
});

export function part1(input) {
  return input
    .split('\n')
    .map(line => {
      let [pattern, counts] = line.split(' ');
      counts = counts.split(',').map(Number);
      return solve(pattern, counts);
    })
    .reduce((a, b) => a + b);
}

export function part2(input) {
  const x = input
    .split('\n')
    .map(line => {
      let [pattern, counts] = line.split(' ');
      pattern = new Array(5).fill().map(() => pattern);
      counts = new Array(5).fill().map(() => counts);
      pattern = pattern.join('?');
      counts = counts.join(',').split(',').map(Number);
      return solve(pattern, counts);
    })
    .reduce((a, b) => a + b);
  return x;
}
