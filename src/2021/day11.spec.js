import { part1, part2 } from './day11.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day11 2021', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          [
            '5483143223',
            '2745854711',
            '5264556173',
            '6141336146',
            '6357385478',
            '4167524645',
            '2176841721',
            '6882881134',
            '4846848554',
            '5283751526',
          ].join('\n'),
        ),
      ).toEqual(1656);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(1655);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          [
            '5483143223',
            '2745854711',
            '5264556173',
            '6141336146',
            '6357385478',
            '4167524645',
            '2176841721',
            '6882881134',
            '4846848554',
            '5283751526',
          ].join('\n'),
        ),
      ).toEqual(195);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(337);
    });
  });
});
