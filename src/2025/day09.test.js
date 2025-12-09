import { part1, part2 } from "./day09.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day09 2025", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          ["7,1", "11,1", "11,7", "9,7", "9,5", "2,5", "2,3", "7,3"].join("\n"),
        ),
      ).toEqual(50);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(4769758290);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          ["7,1", "11,1", "11,7", "9,7", "9,5", "2,5", "2,3", "7,3"].join("\n"),
        ),
      ).toEqual(24);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(1588990708);
    });
  });
});
