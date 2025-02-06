import { day } from "./day06.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day06 2017", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(day("0 2 7 0").part1).toEqual(5);
    });

    test("it should work for part 1 input", () => {
      expect(day(input).part1).toEqual(12841);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(day("0 2 7 0").part2).toEqual(4);
    });

    test("it should work for part 2 input", () => {
      expect(day(input).part2).toEqual(8038);
    });
  });
});
