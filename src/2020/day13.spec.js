import { part1, part2 } from './day13.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day13 2020', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1(['939', '7,13,x,x,59,x,31,19'].join('\n'))).toEqual(295);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(2545);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(part2(['939', '7,13,x,x,59,x,31,19'].join('\n'))).toEqual(1068781);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(266204454441577);
    });
  });
});
