import { part1, part2 } from './day18.js';
import readInput from '../utils/read-input';

const input = readInput(import.meta.url);

describe('day18 2018', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
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

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(483840);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(219919);
    });
  });
});
