function clean(line) {
  for (let len = 0; line.length !== len; ) {
    len = line.length;
    line = line.replaceAll(/\(\)|\[\]|\{\}|<>/g, '');
  }
  return line;
}

function score(line) {
  const points = { ')': 3, ']': 57, '}': 1197, '>': 25137 };
  return points[line.split('').find(c => ')]}>'.includes(c))] || 0;
}

function score2(line) {
  const points = { '(': 1, '[': 2, '{': 3, '<': 4 };
  const chars = line.split('').reverse();
  return chars.reduce((total, c) => total * 5 + points[c], 0);
}

export function part1(input) {
  const scores = input.split('\n').map(x => score(clean(x)));
  return scores.reduce((a, b) => a + b);
}

export function part2(input) {
  const incomplete = input.split('\n').filter(x => score(clean(x)) === 0);
  const scores = incomplete.map(x => score2(clean(x))).sort((a, b) => a - b);
  return scores[Math.floor(scores.length / 2)];
}
