import { part1, part2 } from './day05.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day05 2018', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1('dabAcCaCBAcCcaDA')).toEqual(10);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(10638);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(part2('dabAcCaCBAcCcaDA')).toEqual(4);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(4944);
    });
  });
});
