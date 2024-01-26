import { part1, part2 } from './day12.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day12 2023', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          [
            '???.### 1,1,3',
            '.??..??...?##. 1,1,3',
            '?#?#?#?#?#?#?#? 1,3,1,6',
            '????.#...#... 4,1,1',
            '????.######..#####. 1,6,5',
            '?###???????? 3,2,1',
          ].join('\n'),
        ),
      ).toEqual(21);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(7260);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(
          [
            '???.### 1,1,3',
            '.??..??...?##. 1,1,3',
            '?#?#?#?#?#?#?#? 1,3,1,6',
            '????.#...#... 4,1,1',
            '????.######..#####. 1,6,5',
            '?###???????? 3,2,1',
          ].join('\n'),
        ),
      ).toEqual(525152);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(1909291258644);
    });
  });
});
