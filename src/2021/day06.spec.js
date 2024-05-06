import { part1, part2 } from './day06.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day06 2021', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1('3,4,3,1,2')).toEqual(5934);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(372984);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(part2('3,4,3,1,2')).toEqual(26984457539);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(1681503251694);
    });
  });
});
