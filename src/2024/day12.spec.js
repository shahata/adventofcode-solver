import { part1, part2 } from "./day12.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day12 2024", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1(["AAAA", "BBCD", "BBCC", "EEEC"].join("\n"))).toEqual(140);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(1400386);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2(["AAAA", "BBCD", "BBCC", "EEEC"].join("\n"))).toEqual(80);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(851994);
    });
  });
});
