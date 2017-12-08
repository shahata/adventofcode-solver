const {day} = require('./day11');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe('day11', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
The second floor contains a hydrogen generator.
The third floor contains a lithium generator.
The fourth floor contains nothing relevant.`).shift()).to.equal(11);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(33);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      // expect(day('1').pop()).to.equal('1');
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(57);
    });
  });
});
