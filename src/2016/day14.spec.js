const {part1, part2} = require('./day14');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describeHeavy('day14 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('abc')).to.equal(22728);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(23769);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('abc')).to.equal(22551);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(20606);
    });
  });
});
