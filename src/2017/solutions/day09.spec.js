const {day} = require('./day09');
const {expect} = require('chai');
const readInput = require('../../read-input');
const input = readInput(__filename);

describe('day09', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('{}').shift()).to.equal(1);
      expect(day('{{{}}}').shift()).to.equal(6);
      expect(day('{{},{}}').shift()).to.equal(5);
      expect(day('{{{},{},{{}}}}').shift()).to.equal(16);
      expect(day('{<a>,<a>,<a>,<a>}').shift()).to.equal(1);
      expect(day('{{<ab>},{<ab>},{<ab>},{<ab>}}').shift()).to.equal(9);
      expect(day('{{<!!>},{<!!>},{<!!>},{<!!>}}').shift()).to.equal(9);
      expect(day('{{<a!>},{<a!>},{<a!>},{<ab>}}').shift()).to.equal(3);
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(20530);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day('<>').pop()).to.equal(0);
      expect(day('<random characters>').pop()).to.equal(17);
      expect(day('<<<<>').pop()).to.equal(3);
      expect(day('<{!>}>').pop()).to.equal(2);
      expect(day('<!!>').pop()).to.equal(0);
      expect(day('<!!!>>').pop()).to.equal(0);
      expect(day('<{o"i!a,<{i<a>').pop()).to.equal(10);
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal(9978);
    });
  });
});
