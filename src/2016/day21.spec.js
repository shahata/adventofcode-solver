const {part1, part2} = require('./day21');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day21 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1(`swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d`, 'abcde')).to.equal('decab');
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal('fdhbcgea');
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2(`swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d`, 'decab')).to.equal('abcde');
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal('egfbcadh');
    });
  });
});
