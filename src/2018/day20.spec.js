import { part1, part2 } from './day20.js';
import readInput from '../utils/read-input';

const input = readInput(import.meta.url);

describe('day20 2018', () => {
  describe('part1', () => {
    it('should work for part 1 examples 1', () => {
      expect(part1('^WNE$')).toEqual(3);
      expect(part1('^ENWWW(NEEE|SSE(EE|N))$')).toEqual(10);
      expect(part1('^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$')).toEqual(18);
    });

    it('should work for part 1 examples 2', () => {
      expect(
        part1('^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$'),
      ).toEqual(23);
    });

    it('should work for part 1 examples 3', () => {
      expect(
        part1(
          '^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$',
        ),
      ).toEqual(31);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(3721);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(8613);
    });
  });
});
