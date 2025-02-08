import { part1, part2 } from "./day11.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day11 2023", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "...#......",
            ".......#..",
            "#.........",
            "..........",
            "......#...",
            ".#........",
            ".........#",
            "..........",
            ".......#..",
            "#...#.....",
          ].join("\n"),
        ),
      ).toEqual(374);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(9724940);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part1(
          [
            "...#......",
            ".......#..",
            "#.........",
            "..........",
            "......#...",
            ".#........",
            ".........#",
            "..........",
            ".......#..",
            "#...#.....",
          ].join("\n"),
          9,
        ),
      ).toEqual(1030);

      expect(
        part1(
          [
            "...#......",
            ".......#..",
            "#.........",
            "..........",
            "......#...",
            ".#........",
            ".........#",
            "..........",
            ".......#..",
            "#...#.....",
          ].join("\n"),
          99,
        ),
      ).toEqual(8410);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(569052586852);
    });
  });
});
