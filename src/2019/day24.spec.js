import { part1, part2 } from "./day24.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day24 2019", () => {
  describe("part1", () => {
    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(14539258);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(["....#", "#..#.", "#..##", "..#..", "#...."].join("\n"), 10),
      ).toEqual(99);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(1977);
    });
  });
});
