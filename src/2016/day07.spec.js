const {part1, part2} = require('./day07');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day07 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      let s1, s2, s3, s4;
      expect(part1(s1 = 'abba[mnop]qrst')).to.equal(1);
      expect(part1(s2 = 'abcd[bddb]xyyx')).to.equal(0);
      expect(part1(s3 = 'aaaa[qwer]tyui')).to.equal(0);
      expect(part1(s4 = 'ioxxoj[asdfgh]zxcvbn')).to.equal(1);
      expect(part1([s1, s2, s3, s4].join('\n'))).to.equal(2);
    });

    it('should support multiple hypernets', () => {
      expect(part1('abba[abba]a[xxxx]qrst')).to.equal(0);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(105);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      let s1, s2, s3, s4;
      expect(part2(s1 = 'aba[bab]xyz')).to.equal(1);
      expect(part2(s2 = 'xyx[xyx]xyx')).to.equal(0);
      expect(part2(s3 = 'aaa[kek]eke')).to.equal(1);
      expect(part2(s4 = 'zazbz[bzb]cdb')).to.equal(1);
      expect(part2([s1, s2, s3, s4].join('\n'))).to.equal(3);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(258);
    });
  });
});
