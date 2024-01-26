import { part1, part2 } from './day06.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day06 2020', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          [
            'abc',
            '',
            'a',
            'b',
            'c',
            '',
            'ab',
            'ac',
            '',
            'a',
            'a',
            'a',
            'a',
            '',
            'b',
          ].join('\n'),
        ),
      ).toEqual(11);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(6587);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(
          [
            'abc',
            '',
            'a',
            'b',
            'c',
            '',
            'ab',
            'ac',
            '',
            'a',
            'a',
            'a',
            'a',
            '',
            'b',
          ].join('\n'),
        ),
      ).toEqual(6);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(3235);
    });
  });
});
