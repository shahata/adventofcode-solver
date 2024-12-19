function countMatches(line, patterns, memo) {
  let matches = 0;
  if (line in memo) return memo[line];
  if (line.length === 0) return 1;
  for (let pattern of patterns) {
    if (line.startsWith(pattern)) {
      matches += countMatches(line.slice(pattern.length), patterns, memo);
    }
  }
  return (memo[line] = matches);
}

function solve(input, memo = {}) {
  let [patterns, lines] = input.split("\n\n").map(x => x.split(/(\n|, )/));
  return lines.map(line => countMatches(line, patterns, memo));
}

export function part1(input) {
  return solve(input).filter(x => x > 0).length;
}

export function part2(input) {
  return solve(input).reduce((a, b) => a + b);
}
