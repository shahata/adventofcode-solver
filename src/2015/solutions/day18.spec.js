const {day} = require('./day18');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe('day18 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`.#.#.#
...##.
#....#
..#...
#.#..#
####..`, 4).shift()).to.equal(4);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(814);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day(`##.#.#
...##.
#....#
..#...
#.#..#
####.#`, 5).pop()).to.equal(17);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(924);
    });
  });
});
