import { part1, part2 } from './day22.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day22 2023', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          [
            '1,0,1~1,2,1',
            '0,0,2~2,0,2',
            '0,2,3~2,2,3',
            '0,0,4~0,2,4',
            '2,0,5~2,2,5',
            '0,1,6~2,1,6',
            '1,1,8~1,1,9',
          ].join('\n'),
        ),
      ).toEqual(5);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(527);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          [
            '1,0,1~1,2,1',
            '0,0,2~2,0,2',
            '0,2,3~2,2,3',
            '0,0,4~0,2,4',
            '2,0,5~2,2,5',
            '0,1,6~2,1,6',
            '1,1,8~1,1,9',
          ].join('\n'),
        ),
      ).toEqual(7);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(100376);
    });
  });
});
