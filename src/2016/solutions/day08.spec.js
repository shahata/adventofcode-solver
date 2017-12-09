const {day} = require('./day08');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe('day08 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day(`rect 3x2
rotate column x=1 by 1
rotate row y=0 by 4
rotate column x=1 by 1`, 7, 3).shift()).to.equal(6);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(128);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day(`rect 3x2
rotate column x=1 by 1
rotate row y=0 by 4
rotate column x=1 by 1`, 7, 3).pop()).to.equal(`
.#..#.#
#.#....
.#.....`);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(`
####..##...##..###...##..###..#..#.#...#.##...##..
#....#..#.#..#.#..#.#..#.#..#.#..#.#...##..#.#..#.
###..#..#.#..#.#..#.#....#..#.####..#.#.#..#.#..#.
#....#..#.####.###..#.##.###..#..#...#..####.#..#.
#....#..#.#..#.#.#..#..#.#....#..#...#..#..#.#..#.
####..##..#..#.#..#..###.#....#..#...#..#..#..##..`); //EOARGPHYAO
    });
  });
});
