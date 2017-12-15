const {day} = require('./day02');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day02 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`5 1 9 5
7 5 3
2 4 6 8`).shift()).to.equal(18);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(41887);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day(`5 9 2 8
9 4 7 3
3 8 6 5`).pop()).to.equal(9);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(226);
    });
  });
});
