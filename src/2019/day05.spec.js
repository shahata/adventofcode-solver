import { part1, part2 } from './day05.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day05 2019', () => {
  describe('part1', () => {
    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(15314507);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('3,9,8,9,10,9,4,9,99,-1,8', 8)).toEqual(1);
      expect(part2('3,9,8,9,10,9,4,9,99,-1,8', 9)).toEqual(0);

      expect(part2('3,9,7,9,10,9,4,9,99,-1,8', 7)).toEqual(1);
      expect(part2('3,9,7,9,10,9,4,9,99,-1,8', 8)).toEqual(0);

      expect(part2('3,3,1108,-1,8,3,4,3,99', 8)).toEqual(1);
      expect(part2('3,3,1108,-1,8,3,4,3,99', 9)).toEqual(0);

      expect(part2('3,3,1107,-1,8,3,4,3,99', 7)).toEqual(1);
      expect(part2('3,3,1107,-1,8,3,4,3,99', 8)).toEqual(0);

      expect(part2('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9', 0)).toEqual(0);
      expect(part2('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9', 5)).toEqual(1);

      expect(part2('3,3,1105,-1,9,1101,0,0,12,4,12,99,1', 0)).toEqual(0);
      expect(part2('3,3,1105,-1,9,1101,0,0,12,4,12,99,1', 5)).toEqual(1);

      const long = [
        '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31',
        '1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104',
        '999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99',
      ].join(',');
      expect(part2(long, 7)).toEqual(999);
      expect(part2(long, 8)).toEqual(1000);
      expect(part2(long, 9)).toEqual(1001);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(652726);
    });
  });
});
