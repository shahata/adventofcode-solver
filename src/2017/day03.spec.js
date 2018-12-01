const { part1, part2 } = require('./day03');
const { expect } = require('chai');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day03 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('12')).to.equal(3);
      expect(part1('23')).to.equal(2);
      expect(part1('1024')).to.equal(31);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(480);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2(800)).to.equal(806);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(349975);
    });
  });
});
