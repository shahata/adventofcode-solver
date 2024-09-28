import { part1, part2 } from './{{day}}.js';
import readInput from '../src/utils/read-input.js';

const input = readInput(import.meta.url);

describe.only('{{day}} {{year}}', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1('1')).toEqual(0);
    });

    test('it should work for part 1 input', () => {
      // expect(part1(input)).toEqual(0);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      // expect(part2('1')).toEqual(0);
    });

    test('it should work for part 2 input', () => {
      // expect(part2(input)).toEqual(0);
    });
  });
});
