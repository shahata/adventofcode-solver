const { part1, part2 } = require('./day04');
const { expect } = require('chai');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day04 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(`aa bb cc dd ee
aa bb cc dd aa
aa bb cc dd aaa`),
      ).to.equal(2);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(325);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(`abcde fghij
abcde xyz ecdab
a ab abc abd abf abj
iiii oiii ooii oooi oooo
oiii ioii iioi iiio`),
      ).to.equal(3);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(119);
    });
  });
});
