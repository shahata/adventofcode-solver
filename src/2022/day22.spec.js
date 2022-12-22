import { part1, part2 } from './day22.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day22 2022', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          [
            '        ...#',
            '        .#..',
            '        #...',
            '        ....',
            '...#.......#',
            '........#...',
            '..#....#....',
            '..........#.',
            '        ...#....',
            '        .....#..',
            '        .#......',
            '        ......#.',
            '',
            '10R5L5R10L4R5L5',
          ].join('\n'),
        ),
      ).toEqual(6032);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(189140);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          [
            '        >>v#    ',
            '        .#v.    ',
            '        #.v.    ',
            '        ..v.    ',
            '...#...v..v#    ',
            '>>>v...>#.>>    ',
            '..#v...#....    ',
            '...>>>>v..#.    ',
            '        ...#....',
            '        .....#..',
            '        .#......',
            '        ......#.',
          ].join('\n'),
        ),
      ).toEqual(5031);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(0);
    });
  });
});
