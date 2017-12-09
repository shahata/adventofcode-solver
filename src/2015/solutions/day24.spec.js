const {day} = require('./day24');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe('day24 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`1
2
3
4
5
7
8
9
10
11`).shift()).to.equal(99);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(10723906903);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day(`1
2
3
4
5
7
8
9
10
11`).pop()).to.equal('44');
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal('74850409');
    });
  });
});
