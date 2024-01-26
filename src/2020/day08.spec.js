import { part1, part2 } from './day08.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day08 2020', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          [
            'nop +0',
            'acc +1',
            'jmp +4',
            'acc +3',
            'jmp -3',
            'acc -99',
            'acc +1',
            'jmp -4',
            'acc +6',
          ].join('\n'),
        ),
      ).toEqual(5);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(1548);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(
          [
            'nop +0',
            'acc +1',
            'jmp +4',
            'acc +3',
            'jmp -3',
            'acc -99',
            'acc +1',
            'jmp -4',
            'acc +6',
          ].join('\n'),
        ),
      ).toEqual(8);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(1375);
    });
  });
});
