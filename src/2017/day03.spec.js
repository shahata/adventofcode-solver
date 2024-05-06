import { part1, part2 } from './day03.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day03 2017', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1('12')).toEqual(3);
      expect(part1('23')).toEqual(2);
      expect(part1('1024')).toEqual(31);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(480);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(part2(800)).toEqual(806);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(349975);
    });
  });
});
