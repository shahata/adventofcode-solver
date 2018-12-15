const { part1, part2 } = require('./day15');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day15 2018', () => {
  describe('part1', () => {
    it('should work for part 1 examples 1', () => {
      expect(
        part1(
          [
            '#######',
            '#.G...#',
            '#...EG#',
            '#.#.#G#',
            '#..G#E#',
            '#.....#',
            '#######',
          ].join('\n'),
        ),
      ).toEqual(27730);
    });

    it('should work for part 1 examples 2', () => {
      expect(
        part1(
          [
            '#######',
            '#G..#E#',
            '#E#E.E#',
            '#G.##.#',
            '#...#E#',
            '#...E.#',
            '#######',
          ].join('\n'),
        ),
      ).toEqual(36334);
    });

    it('should work for part 1 examples 3', () => {
      expect(
        part1(
          [
            '#######',
            '#E.G#.#',
            '#.#G..#',
            '#G.#.G#',
            '#G..#.#',
            '#...E.#',
            '#######',
          ].join('\n'),
        ),
      ).toEqual(27755);
    });

    it('should work for part 1 examples 4', () => {
      expect(
        part1(
          [
            '#######',
            '#.E...#',
            '#.#..G#',
            '#.###.#',
            '#E#G#G#',
            '#...#G#',
            '#######',
          ].join('\n'),
        ),
      ).toEqual(28944);
    });

    it('should work for part 1 examples 5', () => {
      expect(
        part1(
          [
            '#########',
            '#G......#',
            '#.E.#...#',
            '#..##..G#',
            '#...##..#',
            '#...#...#',
            '#.G...G.#',
            '#.....G.#',
            '#########',
          ].join('\n'),
        ),
      ).toEqual(18740);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(186000);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      // expect(part2('1')).toEqual(0);
    });

    it('should work for part 2 input', () => {
      // expect(part2(input)).toEqual(0);
    });
  });
});
