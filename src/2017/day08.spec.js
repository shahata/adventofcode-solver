const {day} = require('./day08');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day08 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`).shift()).to.equal(1);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(5143);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day(`b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`).pop()).to.equal(10);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(6209);
    });
  });
});
