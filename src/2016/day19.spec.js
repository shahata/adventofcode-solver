const {part1, part2} = require('./day19');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describeHeavy('day19 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('5')).to.equal(3);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(1816277);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('5')).to.equal(2);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(1410967);
    });
  });
});
