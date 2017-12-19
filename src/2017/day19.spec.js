const {part1, part2} = require('./day19');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe.only('day19 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1(`.....|..........
.....|..+--+....
.....A..|..C....
.F---|----E|--+.
.....|..|..|..D.
.....+B-+..+--+.`)).to.equal('ABCDEF');
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal('KGPTMEJVS');
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2(`.....|..........
.....|..+--+....
.....A..|..C....
.F---|----E|--+.
.....|..|..|..D.
.....+B-+..+--+.`)).to.equal(38);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(16328);
    });
  });
});
