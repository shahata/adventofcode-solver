const {day} = require('./day03');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day03 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('>').shift()).to.equal(2);
      expect(day('^>v<').shift()).to.equal(4);
      expect(day('^v^v^v^v^v').shift()).to.equal(2);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(2592);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day('^v').pop()).to.equal(3);
      expect(day('^>v<').pop()).to.equal(3);
      expect(day('^v^v^v^v^v').pop()).to.equal(11);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(2360);
    });
  });
});
