const {day} = require('./day04');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe('day04 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`aa bb cc dd ee
aa bb cc dd aa
aa bb cc dd aaa`).shift()).to.equal(2);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(325);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day(`abcde fghij
abcde xyz ecdab
a ab abc abd abf abj
iiii oiii ooii oooi oooo
oiii ioii iioi iiio`).pop()).to.equal(3);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(119);
    });
  });
});
