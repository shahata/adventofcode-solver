import { part1, part2 } from './day03.js';
import readInput from '../utils/read-input';

const input = readInput(import.meta.url);

describe('day03 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('5 10 25\n5 10 7\n5 10 2')).toEqual(1);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(862);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          '101 301 501\n102 302 502\n103 303 503\n201 401 601\n202 402 602\n203 403 603',
        ),
      ).toEqual(6);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(1577);
    });
  });
});
