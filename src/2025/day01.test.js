import { part1, part2 } from "./day01.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day01 2025", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "L68",
            "L30",
            "R48",
            "L5",
            "R60",
            "L55",
            "L1",
            "L99",
            "R14",
            "L82",
          ].join("\n"),
        ),
      ).toEqual(3);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(1150);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "L68",
            "L30",
            "R48",
            "L5",
            "R60",
            "L55",
            "L1",
            "L99",
            "R14",
            "L82",
          ].join("\n"),
        ),
      ).toEqual(6);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(6738);
    });
  });
});
