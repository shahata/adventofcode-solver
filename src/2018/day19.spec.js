import { part1, part2 } from './day19.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day19 2018', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          [
            '#ip 0',
            'seti 5 0 1',
            'seti 6 0 2',
            'addi 0 1 0',
            'addr 1 2 3',
            'setr 1 0 0',
            'seti 8 0 4',
            'seti 9 0 5',
          ].join('\n'),
        ),
      ).toEqual(7);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(2072);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(27578880);
    });
  });
});
