const {part1, part2} = require('./day08');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day08 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('""')).to.equal(2 - 0);
      expect(part1('"abc"')).to.equal(5 - 3);
      expect(part1('"aaa\\"aaa"')).to.equal(10 - 7);
      expect(part1('"\\x27"')).to.equal(6 - 1);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(1350);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('""')).to.equal(6 - 2);
      expect(part2('"abc"')).to.equal(9 - 5);
      expect(part2('"aaa\\"aaa"')).to.equal(16 - 10);
      expect(part2('"\\x27"')).to.equal(11 - 6);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(2085);
    });
  });
});
