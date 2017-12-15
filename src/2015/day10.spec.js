const {day} = require('./day10');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day10 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('1', 1).shift()).to.equal(2);
      expect(day('11', 1).shift()).to.equal(2);
      expect(day('21', 1).shift()).to.equal(4);
      expect(day('1211', 1).shift()).to.equal(6);
      expect(day('111221', 1).shift()).to.equal(6);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(252594);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      // expect(day('1').pop()).to.equal('1');
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(3579328);
    });
  });
});
