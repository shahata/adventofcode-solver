import { part1, part2 } from './day25.js';
import readInput from '../utils/read-input';

const input = readInput(__filename);

describe('day25 2016', () => {
  it('should work for input', () => {
    expect(part1(input)).toEqual(180);
    expect(part2(input)).toEqual(undefined);
  });
});
