const { part1, part2 } = require('./day02');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day02 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('ULL\nRRDDD\nLURDL\nUUUUD')).toEqual('1985');
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual('65556');
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('ULL\nRRDDD\nLURDL\nUUUUD')).toEqual('5DB3');
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual('CB779');
    });
  });
});
