const {part1, part2} = require('./day12');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day12 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1(`cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`)).to.equal(42);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(317993);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(9227647);
    });
  });
});
