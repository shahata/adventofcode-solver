import { part1, part2 } from "./day24.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day24 2015", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(["1", "2", "3", "4", "5", "7", "8", "9", "10", "11"].join("\n")),
      ).toEqual(99);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(10723906903);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(["1", "2", "3", "4", "5", "7", "8", "9", "10", "11"].join("\n")),
      ).toEqual(44);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(74850409);
    });
  });
});
