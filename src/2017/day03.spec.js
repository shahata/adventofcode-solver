const {day} = require('./day03');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day03 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('12').shift()).to.equal(3);
      expect(day('23').shift()).to.equal(2);
      expect(day('1024').shift()).to.equal(31);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(480);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day(800).pop()).to.equal(806);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(349975);
    });
  });
});
