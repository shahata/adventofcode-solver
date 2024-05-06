import { day } from './day17.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day17 2018', () => {
  test('it should work for example', () => {
    let { part1, part2 } = day(
      [
        'x=495, y=2..7',
        'y=7, x=495..501',
        'x=501, y=3..7',
        'x=498, y=2..4',
        'x=506, y=1..2',
        'x=498, y=10..13',
        'x=504, y=10..13',
        'y=13, x=498..504',
      ].join('\n'),
    );
    expect(part1).toEqual(57);
    expect(part2).toEqual(29);
  });

  test('it should work for input', () => {
    let { part1, part2 } = day(input);
    expect(part1).toEqual(38451);
    expect(part2).toEqual(28142);
  });
});
