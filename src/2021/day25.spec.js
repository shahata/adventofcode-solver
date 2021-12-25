import { part1, part2 } from './day25.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day25 2021', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          [
            'v...>>.vv>',
            '.vv>>.vv..',
            '>>.>v>...v',
            '>>v>>.>.v.',
            'v>v.vv.v..',
            '>.>>..v...',
            '.vv..>.>v.',
            'v.v..>>v.v',
            '....v..v.>',
          ].join('\n'),
        ),
      ).toEqual(58);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(568);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2()).toEqual(undefined);
    });
  });
});
