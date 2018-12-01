const { part1, part2 } = require('./day08');
const { expect } = require('chai');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day08 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          `rect 3x2
rotate column x=1 by 1
rotate row y=0 by 4
rotate column x=1 by 1`,
          7,
          3,
        ),
      ).to.equal(6);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(128);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          `rect 3x2
rotate column x=1 by 1
rotate row y=0 by 4
rotate column x=1 by 1`,
          7,
          3,
        ),
      ).to.equal(`
.#..#.#
#.#....
.#.....`);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(`
####..##...##..###...##..###..#..#.#...#.##...##..
#....#..#.#..#.#..#.#..#.#..#.#..#.#...##..#.#..#.
###..#..#.#..#.#..#.#....#..#.####..#.#.#..#.#..#.
#....#..#.####.###..#.##.###..#..#...#..####.#..#.
#....#..#.#..#.#.#..#..#.#....#..#...#..#..#.#..#.
####..##..#..#.#..#..###.#....#..#...#..#..#..##..`); //EOARGPHYAO
    });
  });
});
