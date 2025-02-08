import { part1, part2 } from "./day04.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day04 2022", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "2-4,6-8",
            "2-3,4-5",
            "5-7,7-9",
            "2-8,3-7",
            "6-6,4-6",
            "2-6,4-8",
          ].join("\n"),
        ),
      ).toEqual(2);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(453);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "2-4,6-8",
            "2-3,4-5",
            "5-7,7-9",
            "2-8,3-7",
            "6-6,4-6",
            "2-6,4-8",
          ].join("\n"),
        ),
      ).toEqual(4);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(919);
    });
  });
});
