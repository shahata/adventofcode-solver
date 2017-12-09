const {day} = require('./day02');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe('day02 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`2x3x4
1x1x10`).shift()).to.equal(101);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(1588178);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day(`2x3x4
1x1x10`).pop()).to.equal(48);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(3783758);
    });
  });
});
