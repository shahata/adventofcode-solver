const {day} = require('./day09');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe('day09 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`).shift()).to.equal(605);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(251);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day(`London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`).pop()).to.equal(982);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(898);
    });
  });
});
