import { part1, part2 } from './day14.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day14 2017', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1('flqrgnkx')).toEqual(8108);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(8194);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(part2('flqrgnkx')).toEqual(1242);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(1141);
    });
  });
});
