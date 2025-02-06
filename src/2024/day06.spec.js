import { part1, part2 } from "./day06.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day06 2024", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "....#.....",
            ".........#",
            "..........",
            "..#.......",
            ".......#..",
            "..........",
            ".#..^.....",
            "........#.",
            "#.........",
            "......#...",
          ].join("\n"),
        ),
      ).toEqual(41);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(4374);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "....#.....",
            ".........#",
            "..........",
            "..#.......",
            ".......#..",
            "..........",
            ".#..^.....",
            "........#.",
            "#.........",
            "......#...",
          ].join("\n"),
        ),
      ).toEqual(6);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(1705);
    });
  });
});
