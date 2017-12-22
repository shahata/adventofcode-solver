const {day} = require('./day23');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day23 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`inc b
jio b, +2
tpl b
inc b`).shift()).to.equal(2);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(255);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(334);
    });
  });
});
