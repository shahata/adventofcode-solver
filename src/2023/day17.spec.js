import { part1, part2 } from './day17.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day17 2023', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          [
            '2413432311323',
            '3215453535623',
            '3255245654254',
            '3446585845452',
            '4546657867536',
            '1438598798454',
            '4457876987766',
            '3637877979653',
            '4654967986887',
            '4564679986453',
            '1224686865563',
            '2546548887735',
            '4322674655533',
          ].join('\n'),
        ),
      ).toEqual(102);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(694);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(
          [
            '2413432311323',
            '3215453535623',
            '3255245654254',
            '3446585845452',
            '4546657867536',
            '1438598798454',
            '4457876987766',
            '3637877979653',
            '4654967986887',
            '4564679986453',
            '1224686865563',
            '2546548887735',
            '4322674655533',
          ].join('\n'),
        ),
      ).toEqual(94);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(829);
    });
  });
});
