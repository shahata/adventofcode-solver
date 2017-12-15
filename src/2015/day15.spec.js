const {day} = require('./day15');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day15 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3`).shift()).to.equal(62842880);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(13882464);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day(`Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8
Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3`).pop()).to.equal(57600000);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(11171160);
    });
  });
});
