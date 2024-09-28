import { part1, part2 } from './day22.js';
import readInput from '../utils/read-input.js';

const input = readInput(import.meta.url);

describe('day22 2016', () => {
  describe('part1', () => {
    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(937);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(
        part2(
          [
            'root@ebhq-gridcenter# df -h',
            'Filesystem            Size  Used  Avail  Use%',
            '/dev/grid/node-x0-y0   10T    8T     2T   80%',
            '/dev/grid/node-x0-y1   11T    6T     5T   54%',
            '/dev/grid/node-x0-y2   32T   28T     4T   87%',
            '/dev/grid/node-x1-y0    9T    7T     2T   77%',
            '/dev/grid/node-x1-y1    8T    0T     8T    0%',
            '/dev/grid/node-x1-y2   11T    7T     4T   63%',
            '/dev/grid/node-x2-y0   10T    6T     4T   60%',
            '/dev/grid/node-x2-y1    9T    8T     1T   88%',
            '/dev/grid/node-x2-y2    9T    6T     3T   66%',
          ].join('\n'),
        ),
      ).toEqual(7);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(188);
    });
  });
});
