import { part1, part2 } from './day01.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day01 2023', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'].join('\n')),
      ).toEqual(142);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(54953);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(
          [
            'two1nine',
            'eightwothree',
            'abcone2threexyz',
            'xtwone3four',
            '4nineeightseven2',
            'zoneight234',
            '7pqrstsixteen',
          ].join('\n'),
        ),
      ).toEqual(281);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(53868);
    });
  });
});
