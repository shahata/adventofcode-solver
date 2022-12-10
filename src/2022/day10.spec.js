import { part1, part2 } from './day10.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day10 2022', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          [
            'addx 15',
            'addx -11',
            'addx 6',
            'addx -3',
            'addx 5',
            'addx -1',
            'addx -8',
            'addx 13',
            'addx 4',
            'noop',
            'addx -1',
            'addx 5',
            'addx -1',
            'addx 5',
            'addx -1',
            'addx 5',
            'addx -1',
            'addx 5',
            'addx -1',
            'addx -35',
            'addx 1',
            'addx 24',
            'addx -19',
            'addx 1',
            'addx 16',
            'addx -11',
            'noop',
            'noop',
            'addx 21',
            'addx -15',
            'noop',
            'noop',
            'addx -3',
            'addx 9',
            'addx 1',
            'addx -3',
            'addx 8',
            'addx 1',
            'addx 5',
            'noop',
            'noop',
            'noop',
            'noop',
            'noop',
            'addx -36',
            'noop',
            'addx 1',
            'addx 7',
            'noop',
            'noop',
            'noop',
            'addx 2',
            'addx 6',
            'noop',
            'noop',
            'noop',
            'noop',
            'noop',
            'addx 1',
            'noop',
            'noop',
            'addx 7',
            'addx 1',
            'noop',
            'addx -13',
            'addx 13',
            'addx 7',
            'noop',
            'addx 1',
            'addx -33',
            'noop',
            'noop',
            'noop',
            'addx 2',
            'noop',
            'noop',
            'noop',
            'addx 8',
            'noop',
            'addx -1',
            'addx 2',
            'addx 1',
            'noop',
            'addx 17',
            'addx -9',
            'addx 1',
            'addx 1',
            'addx -3',
            'addx 11',
            'noop',
            'noop',
            'addx 1',
            'noop',
            'addx 1',
            'noop',
            'noop',
            'addx -13',
            'addx -19',
            'addx 1',
            'addx 3',
            'addx 26',
            'addx -30',
            'addx 12',
            'addx -1',
            'addx 3',
            'addx 1',
            'noop',
            'noop',
            'noop',
            'addx -9',
            'addx 18',
            'addx 1',
            'addx 2',
            'noop',
            'noop',
            'addx 9',
            'noop',
            'noop',
            'noop',
            'addx -1',
            'addx 2',
            'addx -37',
            'addx 1',
            'addx 3',
            'noop',
            'addx 15',
            'addx -21',
            'addx 22',
            'addx -6',
            'addx 1',
            'noop',
            'addx 2',
            'addx 1',
            'noop',
            'addx -10',
            'noop',
            'noop',
            'addx 20',
            'addx 1',
            'addx 2',
            'addx 2',
            'addx -6',
            'addx -11',
            'noop',
            'noop',
            'noop',
          ].join('\n'),
        ),
      ).toEqual(13140);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(17940);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          [
            'addx 15',
            'addx -11',
            'addx 6',
            'addx -3',
            'addx 5',
            'addx -1',
            'addx -8',
            'addx 13',
            'addx 4',
            'noop',
            'addx -1',
            'addx 5',
            'addx -1',
            'addx 5',
            'addx -1',
            'addx 5',
            'addx -1',
            'addx 5',
            'addx -1',
            'addx -35',
            'addx 1',
            'addx 24',
            'addx -19',
            'addx 1',
            'addx 16',
            'addx -11',
            'noop',
            'noop',
            'addx 21',
            'addx -15',
            'noop',
            'noop',
            'addx -3',
            'addx 9',
            'addx 1',
            'addx -3',
            'addx 8',
            'addx 1',
            'addx 5',
            'noop',
            'noop',
            'noop',
            'noop',
            'noop',
            'addx -36',
            'noop',
            'addx 1',
            'addx 7',
            'noop',
            'noop',
            'noop',
            'addx 2',
            'addx 6',
            'noop',
            'noop',
            'noop',
            'noop',
            'noop',
            'addx 1',
            'noop',
            'noop',
            'addx 7',
            'addx 1',
            'noop',
            'addx -13',
            'addx 13',
            'addx 7',
            'noop',
            'addx 1',
            'addx -33',
            'noop',
            'noop',
            'noop',
            'addx 2',
            'noop',
            'noop',
            'noop',
            'addx 8',
            'noop',
            'addx -1',
            'addx 2',
            'addx 1',
            'noop',
            'addx 17',
            'addx -9',
            'addx 1',
            'addx 1',
            'addx -3',
            'addx 11',
            'noop',
            'noop',
            'addx 1',
            'noop',
            'addx 1',
            'noop',
            'noop',
            'addx -13',
            'addx -19',
            'addx 1',
            'addx 3',
            'addx 26',
            'addx -30',
            'addx 12',
            'addx -1',
            'addx 3',
            'addx 1',
            'noop',
            'noop',
            'noop',
            'addx -9',
            'addx 18',
            'addx 1',
            'addx 2',
            'noop',
            'noop',
            'addx 9',
            'noop',
            'noop',
            'noop',
            'addx -1',
            'addx 2',
            'addx -37',
            'addx 1',
            'addx 3',
            'noop',
            'addx 15',
            'addx -21',
            'addx 22',
            'addx -6',
            'addx 1',
            'noop',
            'addx 2',
            'addx 1',
            'noop',
            'addx -10',
            'noop',
            'noop',
            'addx 20',
            'addx 1',
            'addx 2',
            'addx 2',
            'addx -6',
            'addx -11',
            'noop',
            'noop',
            'noop',
          ].join('\n'),
        ),
      ).toEqual(
        [
          '##..##..##..##..##..##..##..##..##..##..',
          '###...###...###...###...###...###...###.',
          '####....####....####....####....####....',
          '#####.....#####.....#####.....#####.....',
          '######......######......######......####',
          '#######.......#######.......#######.....',
        ].join('\n'),
      );
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(
        [
          '####..##..###...##....##.####...##.####.',
          '...#.#..#.#..#.#..#....#.#.......#....#.',
          '..#..#....###..#..#....#.###.....#...#..',
          '.#...#....#..#.####....#.#.......#..#...',
          '#....#..#.#..#.#..#.#..#.#....#..#.#....',
          '####..##..###..#..#..##..#.....##..####.',
        ].join('\n'),
      );
    });
  });
});
