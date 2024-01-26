import { part1, part2 } from './day20.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day20 2016', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1('5-8\n0-2\n4-7')).toEqual(3);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(14975795);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(101);
    });
  });
});
