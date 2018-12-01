const { part1, part2 } = require('./day14');
const { expect } = require('chai');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day14 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('flqrgnkx')).to.equal(8108);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(8194);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('flqrgnkx')).to.equal(1242);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(1141);
    });
  });
});
