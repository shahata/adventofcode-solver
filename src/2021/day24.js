export function part1(input) {
  const result = new Array(14).fill(9);
  const stack = [];
  let push;
  input.split('\n').forEach((line, i) => {
    const value = +line.split(' ').pop();
    if (i % 18 === 4) push = value === 1;
    if (push && i % 18 === 15) {
      stack.push({ index: Math.floor(i / 18), diff: +value });
    }
    if (!push && i % 18 === 5) {
      let { index, diff } = stack.pop();
      diff += +value;
      if (diff <= 0) {
        result[Math.floor(i / 18)] = 9 + diff;
      } else {
        result[index] = 9 - diff;
      }
    }
  });
  return +result.join('');
}

export function part2(input) {
  const result = new Array(14).fill(1);
  const stack = [];
  let push;
  input.split('\n').forEach((line, i) => {
    const value = +line.split(' ').pop();
    if (i % 18 === 4) push = value === 1;
    if (push && i % 18 === 15) {
      stack.push({ index: Math.floor(i / 18), diff: +value });
    }
    if (!push && i % 18 === 5) {
      let { index, diff } = stack.pop();
      diff += +value;
      if (diff <= 0) {
        result[index] = 1 - diff;
      } else {
        result[Math.floor(i / 18)] = 1 + diff;
      }
    }
  });
  return +result.join('');
}
