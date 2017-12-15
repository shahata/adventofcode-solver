const {day} = require('./day06');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day06 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`turn on 0,0 through 999,999
toggle 0,0 through 999,0
turn off 499,499 through 500,500`).shift()).to.equal(1000000 - 1000 - 4);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(400410);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day('turn on 0,0 through 0,0').pop()).to.equal(1);
      expect(day('toggle 0,0 through 999,999').pop()).to.equal(2000000);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(15343601);
    });
  });
});
