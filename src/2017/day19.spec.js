import { part1, part2 } from './day19.js';
import readInput from '../utils/read-input';

const input = readInput(import.meta.url);

describe('day19 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          [
            '.....|..........',
            '.....|..+--+....',
            '.....A..|..C....',
            '.F---|----E|--+.',
            '.....|..|..|..D.',
            '.....+B-+..+--+.',
          ].join('\n'),
        ),
      ).toEqual('ABCDEF');
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual('KGPTMEJVS');
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          [
            '.....|..........',
            '.....|..+--+....',
            '.....A..|..C....',
            '.F---|----E|--+.',
            '.....|..|..|..D.',
            '.....+B-+..+--+.',
          ].join('\n'),
        ),
      ).toEqual(38);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(16328);
    });
  });
});
