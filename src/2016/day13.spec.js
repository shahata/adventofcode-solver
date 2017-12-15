const {day} = require('./day13');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day13 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('10', {x: 7, y: 4}).shift()).to.equal(11);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(90);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      // expect(day('1').pop()).to.equal('1');
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(135);
    });
  });
});
