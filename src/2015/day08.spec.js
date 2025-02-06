import { part1, part2 } from "./day08.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day08 2015", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1('""')).toEqual(2 - 0);
      expect(part1('"abc"')).toEqual(5 - 3);
      expect(part1('"aaa\\"aaa"')).toEqual(10 - 7);
      expect(part1('"\\x27"')).toEqual(6 - 1);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(1350);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2('""')).toEqual(6 - 2);
      expect(part2('"abc"')).toEqual(9 - 5);
      expect(part2('"aaa\\"aaa"')).toEqual(16 - 10);
      expect(part2('"\\x27"')).toEqual(11 - 6);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(2085);
    });
  });
});
