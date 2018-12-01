const { part1, part2 } = require('./day01');
const { expect } = require('chai');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day01 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('()()')).to.equal(0);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(74);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('()())()')).to.equal(5);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(1795);
    });
  });
});
