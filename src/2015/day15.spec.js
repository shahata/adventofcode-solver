import { day } from './day15.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day15 2015', () => {
  test('it should work for example', () => {
    const { part1, part2 } = day(
      [
        'Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8',
        'Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3',
      ].join('\n'),
    );
    expect(part1).toEqual(62842880);
    expect(part2).toEqual(57600000);
  });

  test('it should work for input', () => {
    const { part1, part2 } = day(input);
    expect(part1).toEqual(13882464);
    expect(part2).toEqual(11171160);
  });
});
