import { part1, part2 } from './day07.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day07 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      let s1, s2, s3, s4;
      expect(part1((s1 = 'abba[mnop]qrst'))).toEqual(1);
      expect(part1((s2 = 'abcd[bddb]xyyx'))).toEqual(0);
      expect(part1((s3 = 'aaaa[qwer]tyui'))).toEqual(0);
      expect(part1((s4 = 'ioxxoj[asdfgh]zxcvbn'))).toEqual(1);
      expect(part1([s1, s2, s3, s4].join('\n'))).toEqual(2);
    });

    it('should support multiple hypernets', () => {
      expect(part1('abba[abba]a[xxxx]qrst')).toEqual(0);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(105);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      let s1, s2, s3, s4;
      expect(part2((s1 = 'aba[bab]xyz'))).toEqual(1);
      expect(part2((s2 = 'xyx[xyx]xyx'))).toEqual(0);
      expect(part2((s3 = 'aaa[kek]eke'))).toEqual(1);
      expect(part2((s4 = 'zazbz[bzb]cdb'))).toEqual(1);
      expect(part2([s1, s2, s3, s4].join('\n'))).toEqual(3);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(258);
    });
  });
});
