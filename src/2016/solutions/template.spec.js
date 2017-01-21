const fs = require('fs');
const path = require('path');
const {day} = require('./template');
const {expect} = require('chai');
const input = fs.readFileSync(path.join(__dirname, 'template.txt')).toString();

describe('template', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(day('1').shift()).to.equal('1');
    });

    it('should work for part 1 input', () => {
      expect(day(input).shift()).to.equal(input);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      // expect(day('1').pop()).to.equal('1');
    });

    it('should work for part 2 input', () => {
      // expect(day(input).pop()).to.equal(input);
    });
  });
});
