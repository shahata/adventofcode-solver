import { part1, part2 } from "./day05.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day05 2020", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(["BFFFBBFRRR", "FFFBBBFRRR", "BBFFBBFRLL"].join("\n")),
      ).toEqual(820);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(806);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(562);
    });
  });
});
