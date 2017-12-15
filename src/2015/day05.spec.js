const {day} = require('./day05');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day05 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('ugknbfddgicrmopn').shift()).to.equal(1);
      expect(day('aaa').shift()).to.equal(1);
      expect(day('jchzalrnumimnmhp').shift()).to.equal(0);
      expect(day('haegwjzuvuyypxyu').shift()).to.equal(0);
      expect(day('dvszwmarrgswjxmb').shift()).to.equal(0);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(236);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day('qjhvhtzxzqqjkmpb').pop()).to.equal(1);
      expect(day('xxyxx').pop()).to.equal(1);
      expect(day('uurcxstgmygtbstg').pop()).to.equal(0);
      expect(day('ieodomkazucvgmuy').pop()).to.equal(0);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(51);
    });
  });
});
