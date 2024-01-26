import { part1, part2 } from './day03.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day03 2015', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1('>')).toEqual(2);
      expect(part1('^>v<')).toEqual(4);
      expect(part1('^v^v^v^v^v')).toEqual(2);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(2592);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(part2('^v')).toEqual(3);
      expect(part2('^>v<')).toEqual(3);
      expect(part2('^v^v^v^v^v')).toEqual(11);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(2360);
    });
  });
});
