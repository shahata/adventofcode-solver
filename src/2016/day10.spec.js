const {day} = require('./day10');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day10 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`value 5 goes to bot 2
bot 2 gives low to bot 1 and high to bot 0
value 3 goes to bot 1
bot 1 gives low to output 1 and high to bot 0
bot 0 gives low to output 2 and high to output 0
value 2 goes to bot 2`, 2, 5).shift()).to.equal(2);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(181);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day(`value 5 goes to bot 2
bot 2 gives low to bot 1 and high to bot 0
value 3 goes to bot 1
bot 1 gives low to output 1 and high to bot 0
bot 0 gives low to output 2 and high to output 0
value 2 goes to bot 2`, 2, 5).pop()).to.equal(30);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(12567);
    });
  });
});
