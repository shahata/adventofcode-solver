import { part1, part2 } from './day14.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day14 2023', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          [
            'O....#....',
            'O.OO#....#',
            '.....##...',
            'OO.#O....O',
            '.O.....O#.',
            'O.#..O.#.#',
            '..O..#O..O',
            '.......O..',
            '#....###..',
            '#OO..#....',
          ].join('\n'),
        ),
      ).toEqual(136);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(105784);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          [
            'O....#....',
            'O.OO#....#',
            '.....##...',
            'OO.#O....O',
            '.O.....O#.',
            'O.#..O.#.#',
            '..O..#O..O',
            '.......O..',
            '#....###..',
            '#OO..#....',
          ].join('\n'),
        ),
      ).toEqual(64);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(91286);
    });
  });
});
