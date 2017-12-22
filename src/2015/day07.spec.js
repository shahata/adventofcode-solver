const {part1, part2} = require('./day07');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day07 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('123 -> x\n456 -> y\nx AND y -> a')).to.equal(72);
      expect(part1(`123 -> x\n456 -> y\nx OR y -> a`)).to.equal(507);
      expect(part1(`123 -> x\n456 -> y\nx LSHIFT 2 -> a`)).to.equal(492);
      expect(part1(`123 -> x\n456 -> y\ny RSHIFT 2 -> a`)).to.equal(114);
      expect(part1(`123 -> x\n456 -> y\nNOT x -> a`)).to.equal(65412);
      expect(part1(`123 -> x\n456 -> y\nNOT y -> a`)).to.equal(65079);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(16076);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(2797);
    });
  });
});
