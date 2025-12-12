import { part1, part2 } from "./day12.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day12 2025", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "0:",
            "###",
            "##.",
            "##.",
            "",
            "1:",
            "###",
            "##.",
            ".##",
            "",
            "2:",
            ".##",
            "###",
            "##.",
            "",
            "3:",
            "##.",
            "###",
            "##.",
            "",
            "4:",
            "###",
            "#..",
            "###",
            "",
            "5:",
            "###",
            ".#.",
            "###",
            "",
            "4x4: 0 0 0 0 2 0",
            "12x5: 1 0 1 0 2 2",
            "12x5: 1 0 1 0 3 2",
          ].join("\n"),
        ),
      ).toEqual(2);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(485);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 input", () => {
      expect(part2()).toEqual(undefined);
    });
  });
});
