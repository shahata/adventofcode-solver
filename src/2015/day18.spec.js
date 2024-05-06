import { part1, part2 } from './day18.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day18 2015', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          `.#.#.#
...##.
#....#
..#...
#.#..#
####..`,
          4,
        ),
      ).toEqual(4);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(814);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(
          `##.#.#
...##.
#....#
..#...
#.#..#
####.#`,
          5,
        ),
      ).toEqual(17);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(924);
    });
  });
});
