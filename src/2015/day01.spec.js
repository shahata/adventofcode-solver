const {day} = require('./day01');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day01 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('()()').shift()).to.equal(0);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(74);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day('()())()').pop()).to.equal(5);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(1795);
    });
  });
});
