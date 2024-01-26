import { part1, part2 } from './day03.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day03 2021', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          [
            '00100',
            '11110',
            '10110',
            '10111',
            '10101',
            '01111',
            '00111',
            '11100',
            '10000',
            '11001',
            '00010',
            '01010',
          ].join('\n'),
        ),
      ).toEqual(198);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(4118544);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(
          [
            '00100',
            '11110',
            '10110',
            '10111',
            '10101',
            '01111',
            '00111',
            '11100',
            '10000',
            '11001',
            '00010',
            '01010',
          ].join('\n'),
        ),
      ).toEqual(230);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(3832770);
    });
  });
});
