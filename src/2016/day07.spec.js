const {day} = require('./day07');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day07 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      let s1, s2, s3, s4;
      expect(day(s1 = 'abba[mnop]qrst').shift()).to.equal(1);
      expect(day(s2 = 'abcd[bddb]xyyx').shift()).to.equal(0);
      expect(day(s3 = 'aaaa[qwer]tyui').shift()).to.equal(0);
      expect(day(s4 = 'ioxxoj[asdfgh]zxcvbn').shift()).to.equal(1);
      expect(day([s1, s2, s3, s4].join('\n')).shift()).to.equal(2);
    });

    it('should support multiple hypernets', () => {
      expect(day('abba[abba]a[xxxx]qrst').shift()).to.equal(0);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(105);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      let s1, s2, s3, s4;
      expect(day(s1 = 'aba[bab]xyz').pop()).to.equal(1);
      expect(day(s2 = 'xyx[xyx]xyx').pop()).to.equal(0);
      expect(day(s3 = 'aaa[kek]eke').pop()).to.equal(1);
      expect(day(s4 = 'zazbz[bzb]cdb').pop()).to.equal(1);
      expect(day([s1, s2, s3, s4].join('\n')).pop()).to.equal(3);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(258);
    });
  });
});
