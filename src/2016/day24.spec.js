import { part1, part2 } from './day24.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day24 2016', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          [
            '###########',
            '#0.1.....2#',
            '#.#######.#',
            '#4.......3#',
            '###########',
          ].join('\n'),
        ),
      ).toEqual(14);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(412);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(
          [
            '###########',
            '#0.1.....2#',
            '#.#######.#',
            '#4.......3#',
            '###########',
          ].join('\n'),
        ),
      ).toEqual(20);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(664);
    });
  });
});
