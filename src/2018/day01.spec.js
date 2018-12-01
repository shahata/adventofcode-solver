const {part1, part2} = require('./day01');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day01 2018', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('+1, +1, +1'.split(', ').join('\n'))).to.equal(3);
      expect(part1('+1, +1, -2'.split(', ').join('\n'))).to.equal(0);
      expect(part1('-1, -2, -3'.split(', ').join('\n'))).to.equal(-6);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(531);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('+1, -1'.split(', ').join('\n'))).to.equal(0);
      expect(part2('+3, +3, +4, -2, -4'.split(', ').join('\n'))).to.equal(10);
      expect(part2('-6, +3, +8, +5, -6'.split(', ').join('\n'))).to.equal(5);
      expect(part2('+7, +7, -2, -7, -4'.split(', ').join('\n'))).to.equal(14);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(76787);
    });
  });
});
