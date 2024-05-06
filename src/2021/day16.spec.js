import { part1, part2 } from './day16.js';
import readInput from '../utils/read-input.js';

let input = readInput(import.meta.url);

describe('day16 2021', () => {
  describe('part1', () => {
    test('it should work for part 1 examples', () => {
      expect(part1('8A004A801A8002F478')).toEqual(16);
      expect(part1('620080001611562C8802118E34')).toEqual(12);
      expect(part1('C0015000016115A2E0802F182340')).toEqual(23);
      expect(part1('A0016C880162017C3686B18A3D4780')).toEqual(31);
    });

    test('it should work for part 1 input', () => {
      expect(part1(input)).toEqual(904);
    });
  });

  describe('part2', () => {
    test('it should work for part 2 examples', () => {
      expect(part2('C200B40A82')).toEqual(3);
      expect(part2('04005AC33890')).toEqual(54);
      expect(part2('880086C3E88112')).toEqual(7);
      expect(part2('CE00C43D881120')).toEqual(9);
      expect(part2('D8005AC2A8F0')).toEqual(1);
      expect(part2('F600BC2D8F')).toEqual(0);
      expect(part2('9C005AC2F8F0')).toEqual(0);
      expect(part2('9C0141080250320F1802104A08')).toEqual(1);
    });

    test('it should work for part 2 input', () => {
      expect(part2(input)).toEqual(200476472872);
    });
  });
});
