import { part1, part2 } from './day10.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day10 2015', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1('1', 1)).toEqual(2);
      expect(part1('11', 1)).toEqual(2);
      expect(part1('21', 1)).toEqual(4);
      expect(part1('1211', 1)).toEqual(6);
      expect(part1('111221', 1)).toEqual(6);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(252594);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(3579328);
    });
  });
});
