function countMatches(line, patterns, memo = {}) {
  let matches = 0;
  if (line in memo) return memo[line];
  if (line.length === 0) return 1;
  for (let pattern of patterns) {
    if (line.startsWith(pattern)) {
      matches += countMatches(line.slice(pattern.length), patterns, memo);
    }
  }
  memo[line] = matches;
  return matches;
}

export function part1(input) {
  let [patterns, lines] = input.split("\n\n");
  patterns = patterns.split(", ");
  let matches = 0;
  for (let line of lines.split("\n")) {
    if (countMatches(line, patterns)) matches++;
  }
  return matches;
}

export function part2(input) {
  let [patterns, lines] = input.split("\n\n");
  patterns = patterns.split(", ");
  let matches = 0;
  for (let line of lines.split("\n")) {
    matches += countMatches(line, patterns);
  }
  return matches;
}
