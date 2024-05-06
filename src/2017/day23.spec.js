import { part1, part2 } from './day23.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day23 2017', () => {
  describe('part1', () => {
    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(4225);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(905);
    });
  });
});
