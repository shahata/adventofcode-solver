const { part1, part2 } = require('./day05');
const { expect } = require('chai');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day05 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(`0
3
0
1
-3`),
      ).to.equal(5);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(343364);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(`0
3
0
1
-3`),
      ).to.equal(10);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(25071947);
    });
  });
});
