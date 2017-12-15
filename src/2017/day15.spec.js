const {day} = require('./day15');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe.skip('day15 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`Generator A starts with 65
Generator B starts with 8921`, 5, 0).shift()).to.equal(1);

      expect(day(`Generator A starts with 65
Generator B starts with 8921`, undefined, 0).shift()).to.equal(588);
    });

    it('should work for part 1 input', () => {
      expect(day(input, undefined, 0).shift()).to.equal(638);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day(`Generator A starts with 65
Generator B starts with 8921`, 0, 1056).pop()).to.equal(1);
      expect(day(`Generator A starts with 65
Generator B starts with 8921`, 0, undefined).pop()).to.equal(309);
    });

    it('should work for part 2 input', () => {
      expect(day(input, 0, undefined).pop()).to.equal(343);
    });
  });
});
