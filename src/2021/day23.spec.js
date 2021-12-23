import { part1, part2 } from './day23.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day23 2021', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          [
            '#############',
            '#...........#',
            '###B#C#B#D###',
            '  #A#D#C#A#',
            '  #########',
          ].join('\n'),
        ),
      ).toEqual(12521);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(11516);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          [
            '#############',
            '#...........#',
            '###B#C#B#D###',
            '  #A#D#C#A#',
            '  #########',
          ].join('\n'),
        ),
      ).toEqual(44169);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(40272);
    });
  });
});
