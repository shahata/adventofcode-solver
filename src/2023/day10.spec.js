import { part1, part2 } from './day10.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day10 2023', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(['-L|F7', '7S-7|', 'L|7||', '-L-J|', 'L|-JF'].join('\n')),
      ).toEqual(4);

      expect(
        part1(['7-F7-', '.FJ|7', 'SJLL7', '|F--J', 'LJ.LJ'].join('\n')),
      ).toEqual(8);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(6846);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          [
            '...........',
            '.S-------7.',
            '.|F-----7|.',
            '.||.....||.',
            '.||.....||.',
            '.|L-7.F-J|.',
            '.|..|.|..|.',
            '.L--J.L--J.',
            '...........',
          ].join('\n'),
        ),
      ).toEqual(4);

      expect(
        part2(
          [
            '..........',
            '.S------7.',
            '.|F----7|.',
            '.||....||.',
            '.||....||.',
            '.|L-7F-J|.',
            '.|..||..|.',
            '.L--JL--J.',
            '..........',
          ].join('\n'),
        ),
      ).toEqual(4);

      expect(
        part2(
          [
            '.F----7F7F7F7F-7....',
            '.|F--7||||||||FJ....',
            '.||.FJ||||||||L7....',
            'FJL7L7LJLJ||LJ.L-7..',
            'L--J.L7...LJS7F-7L7.',
            '....F-J..F7FJ|L7L7L7',
            '....L7.F7||L7|.L7L7|',
            '.....|FJLJ|FJ|F7|.LJ',
            '....FJL-7.||.||||...',
            '....L---J.LJ.LJLJ...',
          ].join('\n'),
        ),
      ).toEqual(8);

      expect(
        part2(
          [
            'FF7FSF7F7F7F7F7F---7',
            'L|LJ||||||||||||F--J',
            'FL-7LJLJ||||||LJL-77',
            'F--JF--7||LJLJ7F7FJ-',
            'L---JF-JLJ.||-FJLJJ7',
            '|F|F-JF---7F7-L7L|7|',
            '|FFJF7L7F-JF7|JL---7',
            '7-L-JL7||F7|L7F-7F7|',
            'L.L7LFJ|||||FJL7||LJ',
            'L7JLJL-JLJLJL--JLJ.L',
          ].join('\n'),
        ),
      ).toEqual(10);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(325);
    });
  });
});
