const {day} = require('./day20');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day20 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`5-8
0-2
4-7`).shift()).to.equal(3);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(14975795);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(101);
    });
  });
});
