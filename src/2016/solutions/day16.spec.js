require('describe-heavy');
const {day} = require('./day16');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe.skip('day16', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('10000', 20).shift()).to.equal('01100');
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal('10011010010010010');
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      // expect(day('1').pop()).to.equal('1');
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal('10101011110100011');
    });
  });
});
