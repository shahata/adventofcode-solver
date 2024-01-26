import { part1, part2 } from './day24.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day24 2023', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          [
            '19, 13, 30 @ -2,  1, -2',
            '18, 19, 22 @ -1, -1, -2',
            '20, 25, 34 @ -2, -2, -4',
            '12, 31, 28 @ -1, -2, -1',
            '20, 19, 15 @  1, -5, -3',
          ].join('\n'),
          7,
          27,
        ),
      ).toEqual(2);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(13965);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(
          [
            '19, 13, 30 @ -2,  1, -2',
            '18, 19, 22 @ -1, -1, -2',
            '20, 25, 34 @ -2, -2, -4',
            '12, 31, 28 @ -1, -2, -1',
            '20, 19, 15 @  1, -5, -3',
          ].join('\n'),
        ),
      ).toEqual(47n);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(578177720733043n);
    });
  });
});
