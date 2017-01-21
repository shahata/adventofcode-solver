const fs = require('fs');
const day = require('./day04');
const {expect} = require('chai');
const input = fs.readFileSync(`${__dirname}/day04.txt`).toString();

describe('template', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`aaaaa-bbb-z-y-x-123[abxyz]
a-b-c-d-e-f-g-h-987[abcde]
not-a-real-room-404[oarel]
totally-real-room-200[decoy]`).shift()).to.equal(1514);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(245102);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      // expect(day('4').pop()).to.equal('4');
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(324);
    });
  });
});
