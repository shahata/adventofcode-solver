const {day} = require('./day12');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day12 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`).shift()).to.equal(6);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(175);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day(`0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`).pop()).to.equal(2);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(213);
    });
  });
});
