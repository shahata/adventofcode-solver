const {part1, part2} = require('./day14');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day14 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1(`Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`, 1000)).to.equal(1120);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(2640);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2(`Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
  Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`, 1000)).to.equal(689);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(1102);
    });
  });
});
