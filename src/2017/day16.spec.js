const { part1, part2 } = require('./day16');
const { expect } = require('chai');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day16 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('s1,x3/4,pe/b', 'abcde')).to.equal('baedc');
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal('olgejankfhbmpidc');
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('s1,x3/4,pe/b', 'abcde', 2)).to.equal('ceadb');
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal('gfabehpdojkcimnl');
    });
  });
});
