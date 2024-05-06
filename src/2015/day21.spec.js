import { part1, part2 } from './day21.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day21 2015', () => {
  describe('part1', () => {
    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(78);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(148);
    });
  });
});
