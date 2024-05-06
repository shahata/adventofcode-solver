import { part1, part2 } from './day02.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day02 2020', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'].join('\n')),
      ).toEqual(2);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(638);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'].join('\n')),
      ).toEqual(1);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(699);
    });
  });
});
