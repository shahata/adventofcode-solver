const { part1, part2 } = require('./day09');
const { expect } = require('chai');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day09 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('{}')).to.equal(1);
      expect(part1('{{{}}}')).to.equal(6);
      expect(part1('{{},{}}')).to.equal(5);
      expect(part1('{{{},{},{{}}}}')).to.equal(16);
      expect(part1('{<a>,<a>,<a>,<a>}')).to.equal(1);
      expect(part1('{{<ab>},{<ab>},{<ab>},{<ab>}}')).to.equal(9);
      expect(part1('{{<!!>},{<!!>},{<!!>},{<!!>}}')).to.equal(9);
      expect(part1('{{<a!>},{<a!>},{<a!>},{<ab>}}')).to.equal(3);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(20530);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('<>')).to.equal(0);
      expect(part2('<random characters>')).to.equal(17);
      expect(part2('<<<<>')).to.equal(3);
      expect(part2('<{!>}>')).to.equal(2);
      expect(part2('<!!>')).to.equal(0);
      expect(part2('<!!!>>')).to.equal(0);
      expect(part2('<{o"i!a,<{i<a>')).to.equal(10);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(9978);
    });
  });
});
