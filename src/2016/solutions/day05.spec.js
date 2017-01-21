const fs = require('fs');
require('describe-heavy');
const path = require('path');
const {day} = require('./day05');
const {expect} = require('chai');
const input = fs.readFileSync(path.join(__dirname, 'day05.txt')).toString();

describe.heavy('day05', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('abc').shift()).to.equal('18f47a30');
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal('f97c354d');
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(day('abc').pop()).to.equal('05ace8e3');
    });

    it('should work for part 2 input', () => {
      expect(day(input).pop()).to.equal('863dde27');
    });
  });
});
