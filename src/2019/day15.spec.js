import { part1, part2 } from './day15.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day15 2019', () => {
  describe('part1', () => {
    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(228);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(348);
    });
  });
});
