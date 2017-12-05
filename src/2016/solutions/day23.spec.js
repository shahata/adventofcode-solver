const {day} = require('./day23');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe('day23', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`cpy 2 a
tgl a
tgl a
tgl a
cpy 1 a
dec a
dec a`).shift()).to.equal(3);
    });

    it.only('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(10880);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      // expect(day('1').pop()).to.equal('1');
    });

    it('should work for part 2 input', () => {
      // expect(day(input).pop()).to.equal(input);
    });
  });
});
