const {day} = require('./day05');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe('day05', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`0
3
0
1
-3`).shift()).to.equal(5);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(343364);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day(`0
3
0
1
-3`).pop()).to.equal(10);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(25071947);
    });
  });
});
