const {part1, part2} = require('./day15');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day15 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1(`Disc #1 has 5 positions; at time=0, it is at position 4.
Disc #2 has 2 positions; at time=0, it is at position 1.`)).to.equal(5);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(376777);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(3903937);
    });
  });
});
