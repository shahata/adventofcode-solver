import { part1, part2 } from './day03.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day03 2023', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          [
            '467..114..',
            '...*......',
            '..35..633.',
            '......#...',
            '617*......',
            '.....+.58.',
            '..592.....',
            '......755.',
            '...$.*....',
            '.664.598..',
          ].join('\n'),
        ),
      ).toEqual(4361);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(528799);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          [
            '467..114..',
            '...*......',
            '..35..633.',
            '......#...',
            '617*......',
            '.....+.58.',
            '..592.....',
            '......755.',
            '...$.*....',
            '.664.598..',
          ].join('\n'),
        ),
      ).toEqual(467835);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(84907174);
    });
  });
});
