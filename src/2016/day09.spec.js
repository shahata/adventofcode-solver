const {day} = require('./day09');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day09 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('ADVENT').shift()).to.equal('ADVENT'.length);
      expect(day('A(1x5)BC').shift()).to.equal('ABBBBBC'.length);
      expect(day('(3x3)XYZ').shift()).to.equal('XYZXYZXYZ'.length);
      expect(day('(6x1)(1x3)A').shift()).to.equal('(1x3)A'.length);
      expect(day('X(8x2)(3x3)ABCY').shift()).to.equal('X(3x3)ABC(3x3)ABCY'.length);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(74532);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day('(3x3)XYZ').pop()).to.equal('XYZXYZXYZ'.length);
      expect(day('X(8x2)(3x3)ABCY').pop()).to.equal('XABCABCABCABCABCABCY'.length);
      expect(day('(27x12)(20x12)(13x14)(7x10)(1x12)A').pop()).to.equal(241920);
      expect(day('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN').pop()).to.equal(445);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(11558231665);
    });
  });
});
