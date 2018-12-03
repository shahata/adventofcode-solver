const { part1, part2 } = require('./day04');
const { itHeavy } = require('describe-heavy');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day04 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('abcdef')).toEqual(609043);
      expect(part1('pqrstuv')).toEqual(1048970);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(282749);
    });
  });

  describe('part2', () => {
    itHeavy('should work for part 2 input', () => {
      expect(part2(input)).toEqual(9962624);
    });
  });
});
