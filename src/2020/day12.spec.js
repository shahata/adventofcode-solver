import { part1, part2 } from "./day12.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day12 2020", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1(["F10", "N3", "F7", "R90", "F11"].join("\n"))).toEqual(25);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(2847);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2(["F10", "N3", "F7", "R90", "F11"].join("\n"))).toEqual(286);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(29839);
    });
  });
});
