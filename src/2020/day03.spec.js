import { part1, part2 } from './day03.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day03 2020', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          [
            '..##.......',
            '#...#...#..',
            '.#....#..#.',
            '..#.#...#.#',
            '.#...##..#.',
            '..#.##.....',
            '.#.#.#....#',
            '.#........#',
            '#.##...#...',
            '#...##....#',
            '.#..#...#.#',
          ].join('\n'),
        ),
      ).toEqual(7);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(176);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(
          [
            '..##.......',
            '#...#...#..',
            '.#....#..#.',
            '..#.#...#.#',
            '.#...##..#.',
            '..#.##.....',
            '.#.#.#....#',
            '.#........#',
            '#.##...#...',
            '#...##....#',
            '.#..#...#.#',
          ].join('\n'),
        ),
      ).toEqual(336);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(5872458240);
    });
  });
});
