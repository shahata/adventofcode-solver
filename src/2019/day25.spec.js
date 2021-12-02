import { part1, part2 } from './day25.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day25 2019', () => {
  describe('part1', () => {
    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual('2228740');
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2()).toEqual(undefined);
    });
  });
});
