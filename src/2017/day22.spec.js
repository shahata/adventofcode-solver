const {part1, part2} = require('./day22');
const {expect} = require('chai');
const readInput = require('../utils/read-input');
const input = readInput(__filename);

describe('day22 2017', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('..#\n#..\n...', 7)).to.equal(5);
      expect(part1('..#\n#..\n...', 70)).to.equal(41);
      expect(part1('..#\n#..\n...')).to.equal(5587);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(5339);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('..#\n#..\n...', 100)).to.equal(26);
      expect(part2('..#\n#..\n...')).to.equal(2511944);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(2512380);
    });
  });
});
