import { part1, part2 } from "./day05.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day05 2025", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "3-5",
            "10-14",
            "16-20",
            "12-18",
            "",
            "1",
            "5",
            "8",
            "11",
            "17",
            "32",
          ].join("\n"),
        ),
      ).toEqual(3);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(840);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "3-5",
            "10-14",
            "16-20",
            "12-18",
            "",
            "1",
            "5",
            "8",
            "11",
            "17",
            "32",
          ].join("\n"),
        ),
      ).toEqual(14);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(359913027576322);
    });
  });
});
