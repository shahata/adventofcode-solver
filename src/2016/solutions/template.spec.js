const day = require('./template.js');
const {expect} = require('chai');

const input = '()()';

describe('template', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('1').shift()).to.equal('1');
      expect(day('2').shift()).to.equal('2');
      expect(day('3').shift()).to.equal('3');
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal('()()');
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day('4').pop()).to.equal('4');
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal('()()');
    });
  });
});
