import { part1, part2 } from './day16.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day16 2020', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          [
            'class: 1-3 or 5-7',
            'row: 6-11 or 33-44',
            'seat: 13-40 or 45-50',
            '',
            'your ticket:',
            '7,1,14',
            '',
            'nearby tickets:',
            '7,3,47',
            '40,4,50',
            '55,2,20',
            '38,6,12',
          ].join('\n'),
        ),
      ).toEqual(71);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(24980);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(
          [
            'departure class: 0-1 or 4-19',
            'row: 0-5 or 8-19',
            'seat: 0-13 or 16-19',
            '',
            'your ticket:',
            '11,12,13',
            '',
            'nearby tickets:',
            '3,9,18',
            '15,1,5',
            '5,14,9',
          ].join('\n'),
        ),
      ).toEqual(12);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(809376774329);
    });
  });
});
