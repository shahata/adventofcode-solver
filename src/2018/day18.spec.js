import { part1, part2 } from './day18.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day18 2018', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          [
            '.#.#...|#.',
            '.....#|##|',
            '.|..|...#.',
            '..|#.....#',
            '#.#|||#|#|',
            '...#.||...',
            '.|....|...',
            '||...#|.#|',
            '|.||||..|.',
            '...#.|..|.',
          ].join('\n'),
        ),
      ).toEqual(1147);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(483840);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(219919);
    });
  });
});
