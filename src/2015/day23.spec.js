import { part1, part2 } from "./day23.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day23 2015", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(["inc b", "jio b, +2", "tpl b", "inc b"].join("\n")),
      ).toEqual(2);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(255);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(334);
    });
  });
});
