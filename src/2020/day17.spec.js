import { part1, part2 } from './day17.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day17 2020', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1(['.#.', '..#', '###'].join('\n'))).toEqual(112);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(232);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(part2(['.#.', '..#', '###'].join('\n'))).toEqual(848);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(1620);
    });
  });
});
