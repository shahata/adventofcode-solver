const day = require('./day01');
const {expect} = require('chai');

const input = 'L4, R2, R4, L5, L3, L1, R4, R5, R1, R3, L3, L2, L2, R5, R1, L1, L2, R2, R2, L5, R5, R5, L2, R1, R2, L2, L4, L1, R5, R2, R1, R1, L2, L3, R2, L5, L186, L5, L3, R3, L5, R4, R2, L5, R1, R4, L1, L3, R3, R1, L1, R4, R2, L1, L4, R5, L1, R50, L4, R3, R78, R4, R2, L4, R3, L4, R4, L1, R5, L4, R1, L2, R3, L2, R5, R5, L4, L1, L2, R185, L5, R2, R1, L3, R4, L5, R2, R4, L3, R4, L2, L5, R1, R2, L2, L1, L2, R2, L2, R1, L5, L3, L4, L3, L4, L2, L5, L5, R2, L3, L4, R4, R4, R5, L4, L2, R4, L5, R3, R1, L1, R3, L2, R2, R1, R5, L4, R5, L3, R2, R3, R1, R4, L4, R1, R3, L5, L1, L3, R2, R1, R4, L4, R3, L3, R3, R2, L3, L3, R4, L2, R4, L3, L4, R5, R1, L1, R5, R3, R1, R3, R4, L1, R4, R3, R1, L5, L5, L4, R4, R3, L2, R1, R5, L3, R4, R5, L4, L5, R2';

describe('day01', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('R2, R2, R2').shift()).to.equal(2);
      expect(day('R2, L3').shift()).to.equal(5);
      expect(day('R5, L5, R5, R3').shift()).to.equal(12);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(353);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day('R8, R4, R4, R8').pop()).to.equal(4);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(152);
    });
  });
});
