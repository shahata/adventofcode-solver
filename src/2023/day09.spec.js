import { part1, part2 } from './day09.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day09 2023', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          ['0 3 6 9 12 15', '1 3 6 10 15 21', '10 13 16 21 30 45'].join('\n'),
        ),
      ).toEqual(114);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(1834108701);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(part2(['10 13 16 21 30 45'].join('\n'))).toEqual(5);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(993);
    });
  });
});
