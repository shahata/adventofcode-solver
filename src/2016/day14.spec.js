const { part1, part2 } = require('./day14');
const { describeHeavy } = require('describe-heavy');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day14 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('abc')).toEqual(22728);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(23769);
    });
  });

  describeHeavy('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('abc')).toEqual(22551);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(20606);
    });
  });
});
