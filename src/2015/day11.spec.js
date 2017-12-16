const {day, part1} = require('./day11');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describeHeavy('day11 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('abcdefgh')).to.equal('abcdffaa');
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal('vzbxxyzz');
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal('vzcaabcc');
    });
  });
});
