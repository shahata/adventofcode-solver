const {part1, part2} = require('./day16');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describeHeavy('day16 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('10000', 20)).to.equal('01100');
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal('10011010010010010');
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal('10101011110100011');
    });
  });
});
