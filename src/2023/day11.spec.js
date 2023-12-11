import { part1, part2 } from './day11.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day11 2023', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          [
            '...#......',
            '.......#..',
            '#.........',
            '..........',
            '......#...',
            '.#........',
            '.........#',
            '..........',
            '.......#..',
            '#...#.....',
          ].join('\n'),
        ),
      ).toEqual(374);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(9724940);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part1(
          [
            '...#......',
            '.......#..',
            '#.........',
            '..........',
            '......#...',
            '.#........',
            '.........#',
            '..........',
            '.......#..',
            '#...#.....',
          ].join('\n'),
          9,
        ),
      ).toEqual(1030);

      expect(
        part1(
          [
            '...#......',
            '.......#..',
            '#.........',
            '..........',
            '......#...',
            '.#........',
            '.........#',
            '..........',
            '.......#..',
            '#...#.....',
          ].join('\n'),
          99,
        ),
      ).toEqual(8410);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(569052586852);
    });
  });
});
