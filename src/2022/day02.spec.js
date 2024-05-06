import { part1, part2 } from './day02.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day02 2022', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1(['A Y', 'B X', 'C Z'].join('\n'))).toEqual(15);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(9651);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(part2(['A Y', 'B X', 'C Z'].join('\n'))).toEqual(12);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(10560);
    });
  });
});
