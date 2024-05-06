import { part1, part2 } from './day16.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day16 2016', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1('10000', 20)).toEqual('01100');
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual('10011010010010010');
    });
  });

  describe('part2', () => {
    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual('10101011110100011');
    });
  });
});
