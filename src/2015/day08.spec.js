const {day} = require('./day08');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day08 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('""').shift()).to.equal(2 - 0);
      expect(day('"abc"').shift()).to.equal(5 - 3);
      expect(day('"aaa\\"aaa"').shift()).to.equal(10 - 7);
      expect(day('"\\x27"').shift()).to.equal(6 - 1);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(1350);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day('""').pop()).to.equal(6 - 2);
      expect(day('"abc"').pop()).to.equal(9 - 5);
      expect(day('"aaa\\"aaa"').pop()).to.equal(16 - 10);
      expect(day('"\\x27"').pop()).to.equal(11 - 6);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(2085);
    });
  });
});
