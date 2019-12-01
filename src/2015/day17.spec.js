import { day } from './day17.js';
import readInput from '../utils/read-input';

const input = readInput(import.meta.url);

describe('day17 2015', () => {
  it('should work for example', () => {
    const { part1, part2 } = day(
      `20
15
10
5
5`,
      25,
    );
    expect(part1).toEqual(4);
    expect(part2).toEqual(3);
  });

  it('should work for input', () => {
    const { part1, part2 } = day(input);
    expect(part1).toEqual(654);
    expect(part2).toEqual(57);
  });
});
