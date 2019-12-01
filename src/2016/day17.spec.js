import { part1, part2 } from './day17.js';
import readInput from '../utils/read-input';

const input = readInput(import.meta.url);

describe('day17 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('ihgpwlah')).toEqual('DDRRRD');
      expect(part1('kglvqrro')).toEqual('DDUDRLRRUDRD');
      expect(part1('ulqzkmiv')).toEqual('DRURDRUDDLLDLUURRDULRLDUUDDDRR');
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual('RLRDRDUDDR');
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('ihgpwlah')).toEqual(370);
      expect(part2('kglvqrro')).toEqual(492);
      expect(part2('ulqzkmiv')).toEqual(830);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(420);
    });
  });
});
