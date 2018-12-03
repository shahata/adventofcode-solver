const { part1, part2 } = require('./day22');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day22 2015', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          `Hit Points: 13
Damage: 8`,
          10,
          250,
        ),
      ).toEqual(173 + 53);
      expect(
        part1(
          `Hit Points: 14
Damage: 8`,
          10,
          250,
        ),
      ).toEqual(229 + 113 + 73 + 173 + 53);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(1824);
    });
  });

  describe('part2', () => {
    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(1937);
    });
  });
});
