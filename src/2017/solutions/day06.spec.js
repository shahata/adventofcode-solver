const {day} = require('./day06');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe('day06', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('0 2 7 0').shift()).to.equal(5);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(12841);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day('0 2 7 0').pop()).to.equal(4);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(8038);
    });
  });
});
