const { part1, part2 } = require('./day03');
const { expect } = require('chai');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day03 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('>')).to.equal(2);
      expect(part1('^>v<')).to.equal(4);
      expect(part1('^v^v^v^v^v')).to.equal(2);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(2592);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('^v')).to.equal(3);
      expect(part2('^>v<')).to.equal(3);
      expect(part2('^v^v^v^v^v')).to.equal(11);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(2360);
    });
  });
});
