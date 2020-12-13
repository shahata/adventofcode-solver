import { part1, part2 } from './day24.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day24 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
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

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(412);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
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

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(664);
    });
  });
});
