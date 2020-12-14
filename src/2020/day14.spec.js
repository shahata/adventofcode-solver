import { part1, part2 } from './day14.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day14 2020', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          [
            'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
            'mem[8] = 11',
            'mem[7] = 101',
            'mem[8] = 0',
          ].join('\n'),
        ),
      ).toEqual(165);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(11179633149677);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          [
            'mask = 000000000000000000000000000000X1001X',
            'mem[42] = 100',
            'mask = 00000000000000000000000000000000X0XX',
            'mem[26] = 1',
          ].join('\n'),
        ),
      ).toEqual(208);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(4822600194774);
    });
  });
});
parseInt('100', 2); //?
