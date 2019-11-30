import { part1, part2 } from './day20.js';
import readInput from '../utils/read-input';

const input = readInput(__filename);

describe('day20 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(`p=<3,0,0>, v=<2,0,0>, a=<-1,0,0>
p=<4,0,0>, v=<0,0,0>, a=<-2,0,0>`),
      ).toEqual(0);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(376);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(
        part2(`p=<-6,0,0>, v=<3,0,0>, a=<0,0,0>
p=<-4,0,0>, v=<2,0,0>, a=<0,0,0>
p=<-2,0,0>, v=<1,0,0>, a=<0,0,0>
p=<3,0,0>, v=<-100,0,0>, a=<0,0,0>`),
      ).toEqual(1);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(574);
    });
  });
});
