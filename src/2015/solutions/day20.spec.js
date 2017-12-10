const {day} = require('./day20');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe('day20 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('10').shift()).to.equal(1);
      expect(day('30').shift()).to.equal(2);
      expect(day('40').shift()).to.equal(3);
      expect(day('70').shift()).to.equal(4);
      expect(day('120').shift()).to.equal(6);
      expect(day('150').shift()).to.equal(8);
    });

    itHeavy('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(776160);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      // expect(day('1').pop()).to.equal('1');
    });

    itHeavy('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(786240);
    });
  });
});
