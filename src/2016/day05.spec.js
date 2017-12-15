const {day} = require('./day05');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day05 2016', () => {
  describe('part1', () => {
    itHeavy('should work for part 1 examples', () => {
      expect(day('abc').shift()).to.equal('18f47a30');
    });

    itHeavy('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal('f97c354d');
    });
  });

  describe('part2', () => {
    itHeavy('should work for part 2 examples', () => {
      expect(day('abc').pop()).to.equal('05ace8e3');
    });

    itHeavy('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal('863dde27');
    });
  });
});
