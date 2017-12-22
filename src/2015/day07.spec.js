const {day} = require('./day07');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day07 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`123 -> x
456 -> y
x AND y -> a`).shift()).to.equal(72);
      expect(day(`123 -> x
456 -> y
x OR y -> a`).shift()).to.equal(507);
      expect(day(`123 -> x
456 -> y
x LSHIFT 2 -> a`).shift()).to.equal(492);
      expect(day(`123 -> x
456 -> y
y RSHIFT 2 -> a`).shift()).to.equal(114);
      expect(day(`123 -> x
456 -> y
NOT x -> a`).shift()).to.equal(65412);
      expect(day(`123 -> x
456 -> y
NOT y -> a`).shift()).to.equal(65079);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(16076);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(2797);
    });
  });
});
