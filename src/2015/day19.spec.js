const {part1, part2} = require('./day19');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day19 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1(`H => HO
H => OH
O => HH

HOH`)).to.equal(4);
      expect(part1(`H => HO
H => OH
O => HH

HOHOHO`)).to.equal(7);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(576);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2(`e => H
e => O
H => HO
H => OH
O => HH

HOH`)).to.equal(3);
      expect(part2(`e => H
e => O
H => HO
H => OH
O => HH

HOHOHO`)).to.equal(6);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(207);
    });
  });
});
