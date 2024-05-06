import { part1, part2 } from './day24.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day24 2022', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          [
            '#.######',
            '#>>.<^<#',
            '#.<..<<#',
            '#>v.><>#',
            '#<^v^^>#',
            '######.#',
          ].join('\n'),
        ),
      ).toEqual(18);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(225);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(
          [
            '#.######',
            '#>>.<^<#',
            '#.<..<<#',
            '#>v.><>#',
            '#<^v^^>#',
            '######.#',
          ].join('\n'),
        ),
      ).toEqual(54);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(711);
    });
  });
});
