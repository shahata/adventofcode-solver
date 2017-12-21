const {part1, part2} = require('./day21');
const {expect} = require('chai');
const readInput = require('../read-input');
const input = readInput(__filename);

describe('day21 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1(`../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`, 2)).to.equal(12);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(144);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(2169301);
    });
  });
});
