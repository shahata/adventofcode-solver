const {part1, part2} = require('./day04');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describeHeavy('day04 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('abcdef')).to.equal(609043);
      expect(part1('pqrstuv')).to.equal(1048970);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(282749);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(9962624);
    });
  });
});
