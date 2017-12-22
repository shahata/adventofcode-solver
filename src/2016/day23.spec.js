const {day} = require('./day23');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);
const oldInput = readInput(__filename.replace(/23/g, '12'));

describe('day23 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`).shift()).to.equal(42);
      expect(day(oldInput, {a: 0, b: 0, c: 0, d: 0, index: 0}).shift()).to.equal(317993);
      // expect(day(oldInput, {a: 0, b: 0, c: 1, d: 0, index: 0}).pop()).to.equal(9227647);
      expect(day(`cpy 2 a
tgl a
tgl a
tgl a
cpy 1 a
dec a
dec a`).shift()).to.equal(3);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(10880);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(479007440);
    });
  });
});
