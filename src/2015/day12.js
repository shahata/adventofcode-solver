function deepSum(obj, ignore) {
  if (Array.isArray(obj)) {
    return obj.reduce((sum, x) => sum + deepSum(x, ignore), 0);
  } else if (typeof obj === 'object') {
    const values = Object.keys(obj).map(x => obj[x]);
    return ignore && values.indexOf(ignore) > -1 ? 0 : deepSum(values, ignore);
  } else {
    return typeof obj === 'number' ? obj : 0;
  }
}

const part1 = input => deepSum(JSON.parse(input));
const part2 = input => deepSum(JSON.parse(input), 'red');

module.exports = { part1, part2 };
