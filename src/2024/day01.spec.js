import { part1, part2 } from "./day01.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day01 2024", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          ["3   4", "4   3", "2   5", "1   3", "3   9", "3   3"].join("\n"),
        ),
      ).toEqual(11);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(2285373);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          ["3   4", "4   3", "2   5", "1   3", "3   9", "3   3"].join("\n"),
        ),
      ).toEqual(31);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(21142653);
    });
  });
});
