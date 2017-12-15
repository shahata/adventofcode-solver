const {day} = require('./day04');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day04 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      let s1, s2, s3, s4;
      expect(day(s1 = 'aaaaa-bbb-z-y-x-123[abxyz]').shift()).to.equal(123);
      expect(day(s2 = 'a-b-c-d-e-f-g-h-987[abcde]').shift()).to.equal(987);
      expect(day(s3 = 'not-a-real-room-404[oarel]').shift()).to.equal(404);
      expect(day(s4 = 'totally-real-room-200[decoy]').shift()).to.equal(0);
      expect(day([s1, s2, s3, s4].join('\n')).shift()).to.equal(1514);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(245102);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      // expect(day('1').pop()).to.equal('1');
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(324);
    });
  });
});
