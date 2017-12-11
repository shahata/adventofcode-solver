const {day} = require('./day11');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe('day11 2017', () => {
  describe('part1', () => {
    it.only('should work for part 1 examples', () => {
      expect(day('ne,ne,ne').shift()).to.equal(3);
      expect(day('ne,ne,sw,sw').shift()).to.equal(0);
      expect(day('ne,ne,s,s').shift()).to.equal(2);
      expect(day('se,sw,se,sw,sw').shift()).to.equal(3);
    });

    it.only('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(747);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      // expect(day('1').pop()).to.equal('1');
    });

    it.only('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(1544);
    });
  });
});
