const {day} = require('./day15');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day15 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`Disc #1 has 5 positions; at time=0, it is at position 4.
Disc #2 has 2 positions; at time=0, it is at position 1.`).shift()).to.equal(5);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(376777);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      // expect(day('1').pop()).to.equal('1');
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(3903937);
    });
  });
});
