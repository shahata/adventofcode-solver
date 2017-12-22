const {part1, part2} = require('./day23');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);
const oldInput = readInput(__filename.replace(/23/g, '12'));

describe('day23 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1(`cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`)).to.equal(42);
      expect(part1(oldInput, {a: 0, b: 0, c: 0, d: 0, index: 0})).to.equal(317993);
      // expect(day(oldInput, {a: 0, b: 0, c: 1, d: 0, index: 0}).part2).to.equal(9227647);
      expect(part1(`cpy 2 a
tgl a
tgl a
tgl a
cpy 1 a
dec a
dec a`)).to.equal(3);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(10880);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(479007440);
    });
  });
});
