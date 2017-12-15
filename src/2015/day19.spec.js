const {day} = require('./day19');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day19 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`H => HO
H => OH
O => HH

HOH`).shift()).to.equal(4);
      expect(day(`H => HO
H => OH
O => HH

HOHOHO`).shift()).to.equal(7);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(576);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day(`e => H
e => O
H => HO
H => OH
O => HH

HOH`).pop()).to.equal(3);
      expect(day(`e => H
e => O
H => HO
H => OH
O => HH

HOHOHO`).pop()).to.equal(6);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(207);
    });
  });
});
