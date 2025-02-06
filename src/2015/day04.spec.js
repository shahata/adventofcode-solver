import { part1, part2 } from "./day04.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day04 2015", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1("abcdef")).toEqual(609043);
      expect(part1("pqrstuv")).toEqual(1048970);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(282749);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(9962624);
    });
  });
});
