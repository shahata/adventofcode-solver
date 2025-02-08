import { part1, part2 } from "./day21.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day21 2024", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(["029A", "980A", "179A", "456A", "379A"].join("\n")),
      ).toEqual(126384);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(136780);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(167538833832712);
    });
  });
});
