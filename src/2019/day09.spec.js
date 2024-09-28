import { part1, part2 } from './day09.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day09 2019', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1('109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99'),
      ).toEqual(99);
      expect(part1('1102,34915192,34915192,7,4,7,99,0')).toEqual(
        1219070632396864,
      );
      expect(part1('104,1125899906842624,99')).toEqual(1125899906842624);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(2932210790);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(73144);
    });
  });
});
