const {day} = require('./day14');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe('day14 2016', () => {
  describe('part1', () => {
    itHeavy('should work for part 1 examples', () => {
      expect(day('abc').shift()).to.equal(22728);
    });

    itHeavy('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(23769);
    });
  });

  describe('part2', () => {
    itHeavy('should work for part 2 examples', () => {
      expect(day('abc').pop()).to.equal(22859);
    });

    itHeavy('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(input);
    });
  });
});
