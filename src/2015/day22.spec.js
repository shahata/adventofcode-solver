import { part1, part2 } from "./day22.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day22 2015", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          `Hit Points: 13
Damage: 8`,
          10,
          250,
        ),
      ).toEqual(173 + 53);
      expect(
        part1(
          `Hit Points: 14
Damage: 8`,
          10,
          250,
        ),
      ).toEqual(229 + 113 + 73 + 173 + 53);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(1824);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(1937);
    });
  });
});
