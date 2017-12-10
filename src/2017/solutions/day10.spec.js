const {day} = require('./day10');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe('day10 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('3,4,1,5', 5).shift()).to.equal(12);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(9656);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day('').pop()).to.equal('a2582a3a0e66e6e86e3812dcb672a272');
      expect(day('AoC 2017').pop()).to.equal('33efeb34ea91902bb2f59c9920caa6cd');
      expect(day('1,2,3').pop()).to.equal('3efbe78a8d82f29979031a4aa0b16a9d');
      expect(day('1,2,4').pop()).to.equal('63960835bcdc130f0b66d7ff4f6a5a8e');
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal('20b7b54c92bf73cf3e5631458a715149');
    });
  });
});
