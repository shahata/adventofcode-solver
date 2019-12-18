import { part1, part2 } from './day18.js';
import readInput from '../utils/read-input';

const input = readInput(import.meta.url);

describe('day18 2019', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1(['#########', '#b.A.@.a#', '#########'].join('\n'))).toEqual(
        8,
      );
      expect(
        part1(
          [
            '########################',
            '#f.D.E.e.C.b.A.@.a.B.c.#',
            '######################.#',
            '#d.....................#',
            '########################',
          ].join('\n'),
        ),
      ).toEqual(86);
      expect(
        part1(
          [
            '########################',
            '#...............b.C.D.f#',
            '#.######################',
            '#.....@.a.B.c.d.A.e.F.g#',
            '########################',
          ].join('\n'),
        ),
      ).toEqual(132);
      expect(
        part1(
          [
            '#################',
            '#i.G..c...e..H.p#',
            '########.########',
            '#j.A..b...f..D.o#',
            '########@########',
            '#k.E..a...g..B.n#',
            '########.########',
            '#l.F..d...h..C.m#',
            '#################',
          ].join('\n'),
        ),
      ).toEqual(136);
      expect(
        part1(
          [
            '########################',
            '#@..............ac.GI.b#',
            '###d#e#f################',
            '###A#B#C################',
            '###g#h#i################',
            '########################',
          ].join('\n'),
        ),
      ).toEqual(81);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(4228);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(
          [
            '#######',
            '#a.#Cd#',
            '##...##',
            '##.@.##',
            '##...##',
            '#cB#Ab#',
            '#######',
          ].join('\n'),
        ),
      ).toEqual(8);
      expect(
        part2(
          [
            '###############',
            '#d.ABC.#.....a#',
            '######...######',
            '######.@.######',
            '######...######',
            '#b.....#.....c#',
            '###############',
          ].join('\n'),
        ),
      ).toEqual(24);
      expect(
        part2(
          [
            '#############',
            '#DcBa.#.GhKl#',
            '#.###...#I###',
            '#e#d#.@.#j#k#',
            '###C#...###J#',
            '#fEbA.#.FgHi#',
            '#############',
          ].join('\n'),
        ),
      ).toEqual(32);
      // expect(
      //   part2(
      //     [
      //       '#############',
      //       '#g#f.D#..h#l#',
      //       '#F###e#E###.#',
      //       '#dCba...BcIJ#',
      //       '#####.@.#####',
      //       '#nK.L...G...#',
      //       '#M###N#H###.#',
      //       '#o#m..#i#jk.#',
      //       '#############',
      //     ].join('\n'),
      //   ),
      // ).toEqual(72);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(1858);
    });
  });
});
