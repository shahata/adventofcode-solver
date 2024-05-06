import { part1, part2 } from './day01.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day01 2018', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1('+1, +1, +1'.split(', ').join('\n'))).toEqual(3);
      expect(part1('+1, +1, -2'.split(', ').join('\n'))).toEqual(0);
      expect(part1('-1, -2, -3'.split(', ').join('\n'))).toEqual(-6);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(531);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(part2('+1, -1'.split(', ').join('\n'))).toEqual(0);
      expect(part2('+3, +3, +4, -2, -4'.split(', ').join('\n'))).toEqual(10);
      expect(part2('-6, +3, +8, +5, -6'.split(', ').join('\n'))).toEqual(5);
      expect(part2('+7, +7, -2, -7, -4'.split(', ').join('\n'))).toEqual(14);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(76787);
    });
  });
});
