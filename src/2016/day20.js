const MAX_IP = 4294967295;

function merge(ranges) {
  ranges.sort((a, b) => a[0] - b[0]);
  return ranges.reduce(
    (segments, range) => {
      let lastSegment = segments.at(-1);
      if (range[0] > lastSegment[1] + 1) {
        segments.push(range);
      } else {
        lastSegment[1] = Math.max(range[1], lastSegment[1]);
      }
      return segments;
    },
    [[0, 0]],
  );
}

function parse(input) {
  return input.split("\n").map(x =>
    x
      .match(/^(\d+)-(\d+)$/)
      .slice(1)
      .map(Number),
  );
}

export function part1(input) {
  return merge(parse(input))[0][1] + 1;
}

export function part2(input) {
  let merged = merge(parse(input)).reduce((sum, x) => sum + x[1] - x[0] + 1, 0);
  return MAX_IP - merged + 1;
}
