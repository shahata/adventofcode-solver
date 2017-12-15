const {day} = require('./day14');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day14 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('flqrgnkx').shift()).to.equal(8108);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(8194);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day('flqrgnkx').pop()).to.equal(1242);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(1141);
    });
  });
});
