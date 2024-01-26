import { part1, part2 } from './day19.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day19 2020', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(
        part1(
          [
            '0: 4 1 5',
            '1: 2 3 | 3 2',
            '2: 4 4 | 5 5',
            '3: 4 5 | 5 4',
            '4: "a"',
            '5: "b"',
            '',
            'ababbb',
            'bababa',
            'abbbab',
            'aaabbb',
            'aaaabbb',
          ].join('\n'),
        ),
      ).toEqual(2);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(195);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(
          [
            '42: 9 14 | 10 1',
            '9: 14 27 | 1 26',
            '10: 23 14 | 28 1',
            '1: "a"',
            '11: 42 31',
            '5: 1 14 | 15 1',
            '19: 14 1 | 14 14',
            '12: 24 14 | 19 1',
            '16: 15 1 | 14 14',
            '31: 14 17 | 1 13',
            '6: 14 14 | 1 14',
            '2: 1 24 | 14 4',
            '0: 8 11',
            '13: 14 3 | 1 12',
            '15: 1 | 14',
            '17: 14 2 | 1 7',
            '23: 25 1 | 22 14',
            '28: 16 1',
            '4: 1 1',
            '20: 14 14 | 1 15',
            '3: 5 14 | 16 1',
            '27: 1 6 | 14 18',
            '14: "b"',
            '21: 14 1 | 1 14',
            '25: 1 1 | 1 14',
            '22: 14 14',
            '8: 42',
            '26: 14 22 | 1 20',
            '18: 15 15',
            '7: 14 5 | 1 21',
            '24: 14 1',
            '',
            'abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa',
            'bbabbbbaabaabba',
            'babbbbaabbbbbabbbbbbaabaaabaaa',
            'aaabbbbbbaaaabaababaabababbabaaabbababababaaa',
            'bbbbbbbaaaabbbbaaabbabaaa',
            'bbbababbbbaaaaaaaabbababaaababaabab',
            'ababaaaaaabaaab',
            'ababaaaaabbbaba',
            'baabbaaaabbaaaababbaababb',
            'abbbbabbbbaaaababbbbbbaaaababb',
            'aaaaabbaabaaaaababaa',
            'aaaabbaaaabbaaa',
            'aaaabbaabbaaaaaaabbbabbbaaabbaabaaa',
            'babaaabbbaaabaababbaabababaaab',
            'aabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba',
          ].join('\n'),
        ),
      ).toEqual(12);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(309);
    });
  });
});
