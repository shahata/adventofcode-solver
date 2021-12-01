import { part1, part2 } from './day01.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe.only('day01 2021', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
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

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(1374);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
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

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(1418);
    });
  });
});
