const { part1, part2 } = require('./day18');
const { expect } = require('chai');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day18 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(`set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`),
      ).to.equal(4);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(4601);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      // expect(part2('1')).to.equal('1');
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(6858);
    });
  });
});
