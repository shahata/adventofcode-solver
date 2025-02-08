import { part1, part2 } from "./day02.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day02 2016", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1("ULL\nRRDDD\nLURDL\nUUUUD")).toEqual("1985");
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual("65556");
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2("ULL\nRRDDD\nLURDL\nUUUUD")).toEqual("5DB3");
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual("CB779");
    });
  });
});
