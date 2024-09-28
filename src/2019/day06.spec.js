import { part1, part2 } from './day06.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day06 2019', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          [
            'COM)B',
            'B)C',
            'C)D',
            'D)E',
            'E)F',
            'B)G',
            'G)H',
            'D)I',
            'E)J',
            'J)K',
            'K)L',
          ].join('\n'),
        ),
      ).toEqual(42);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(621125);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(
          [
            'COM)B',
            'B)C',
            'C)D',
            'D)E',
            'E)F',
            'B)G',
            'G)H',
            'D)I',
            'E)J',
            'J)K',
            'K)L',
            'K)YOU',
            'I)SAN',
          ].join('\n'),
        ),
      ).toEqual(4);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(550);
    });
  });
});
