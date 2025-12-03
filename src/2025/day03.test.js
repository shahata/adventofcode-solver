import { part1, part2 } from "./day03.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day03 2025", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "987654321111111",
            "811111111111119",
            "234234234234278",
            "818181911112111",
          ].join("\n"),
        ),
      ).toEqual(357);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(17229);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "987654321111111",
            "811111111111119",
            "234234234234278",
            "818181911112111",
          ].join("\n"),
        ),
      ).toEqual(3121910778619);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(170520923035051);
    });
  });
});
