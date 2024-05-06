import { part1, part2 } from './day01.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day01 2020', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(['1721', '979', '366', '299', '675', '1456'].join('\n')),
      ).toEqual(514579);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(719796);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(['1721', '979', '366', '299', '675', '1456'].join('\n')),
      ).toEqual(241861950);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(144554112);
    });
  });
});
