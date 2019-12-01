import { day } from './day20.js';
import readInput from '../utils/read-input';

const input = readInput(import.meta.url);

describe('day20 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('10', true).part1).toEqual(1);
      expect(day('30', true).part1).toEqual(2);
      expect(day('40', true).part1).toEqual(3);
      expect(day('70', true).part1).toEqual(4);
      expect(day('120', true).part1).toEqual(6);
      expect(day('150', true).part1).toEqual(8);
    });
  });

  it('should work for input', () => {
    const { part1, part2 } = day(input);
    expect(part1).toEqual(776160);
    expect(part2).toEqual(786240);
  });
});
