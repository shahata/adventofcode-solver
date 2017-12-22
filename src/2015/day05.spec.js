const {part1, part2} = require('./day05');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day05 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('ugknbfddgicrmopn')).to.equal(1);
      expect(part1('aaa')).to.equal(1);
      expect(part1('jchzalrnumimnmhp')).to.equal(0);
      expect(part1('haegwjzuvuyypxyu')).to.equal(0);
      expect(part1('dvszwmarrgswjxmb')).to.equal(0);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(236);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('qjhvhtzxzqqjkmpb')).to.equal(1);
      expect(part2('xxyxx')).to.equal(1);
      expect(part2('uurcxstgmygtbstg')).to.equal(0);
      expect(part2('ieodomkazucvgmuy')).to.equal(0);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(51);
    });
  });
});
