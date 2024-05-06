import { part1, part2 } from './day01.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day01 2021', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          [
            '199',
            '200',
            '208',
            '210',
            '200',
            '207',
            '240',
            '269',
            '260',
            '263',
          ].join('\n'),
        ),
      ).toEqual(7);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(1374);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(
          [
            '199',
            '200',
            '208',
            '210',
            '200',
            '207',
            '240',
            '269',
            '260',
            '263',
          ].join('\n'),
        ),
      ).toEqual(5);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(1418);
    });
  });
});
