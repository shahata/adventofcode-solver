const {day} = require('./day12');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describeHeavy('day12 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`).shift()).to.equal(42);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(317993);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(9227647);
    });
  });
});
