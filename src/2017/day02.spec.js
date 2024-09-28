import { part1, part2 } from './day02.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day02 2017', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1(['5 1 9 5', '7 5 3', '2 4 6 8'].join('\n'))).toEqual(18);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(41887);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(part2(['5 9 2 8', '9 4 7 3', '3 8 6 5'].join('\n'))).toEqual(9);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(226);
    });
  });
});
