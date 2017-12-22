const {day} = require('./day01');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day01 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('R2, R2, R2').shift()).to.equal(2);
      expect(day('R2, L3').shift()).to.equal(5);
      expect(day('R5, L5, R5, R3').shift()).to.equal(12);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(353);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day('R8, R4, R4, R8').pop()).to.equal(4);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(152);
    });
  });
});
