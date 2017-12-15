const MAX_IP = 4294967295;

function merge(ranges) {
  ranges.sort((a, b) => a[0] - b[0]);
  return ranges.reduce((segments, range) => {
    const lastSegment = segments[segments.length - 1];
    if (range[0] > lastSegment[1] + 1) {
      segments.push(range);
    } else {
      lastSegment[1] = Math.max(range[1], lastSegment[1]);
    }
    return segments;
  }, [[0, 0]]);
}
function day(input) {
  const ranges = input.split('\n').map(x => x.match(/^(\d+)-(\d+)$/).slice(1).map(x => parseInt(x, 10)));
  const part1 = merge(ranges)[0][1] + 1;
  const part2 = MAX_IP - merge(ranges).reduce((sum, x) => sum + x[1] - x[0] + 1, 0) + 1;
  return [part1, part2];
}

module.exports = {day};
