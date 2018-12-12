const { part1, part2 } = require('./day12');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day12 2018', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(
        part1(
          [
            'initial state: #..#.#..##......###...###',
            '',
            '...## => #',
            '..#.. => #',
            '.#... => #',
            '.#.#. => #',
            '.#.## => #',
            '.##.. => #',
            '.#### => #',
            '#.#.# => #',
            '#.### => #',
            '##.#. => #',
            '##.## => #',
            '###.. => #',
            '###.# => #',
            '####. => #',
          ].join('\n'),
        ),
      ).toEqual(325);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).toEqual(4386);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      // expect(part2('1')).toEqual(0);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).toEqual(5450000001166);
    });
  });
});
