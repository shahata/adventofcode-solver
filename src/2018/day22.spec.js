const { part1, part2 } = require('./day22');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day22 2018', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('depth: 510\ntarget: 10,10')).toEqual(114);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(6256);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('depth: 510\ntarget: 10,10')).toEqual(45);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(973);
    });
  });
});
