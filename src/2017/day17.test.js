import { part1, part2 } from "./day17.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day17 2017", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1("3")).toEqual(638);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(2000);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part1("3", 0)).toEqual(part2("3", 2017));
      expect(part1(input, 0)).toEqual(part2(input, 2017));
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(10242889);
    });
  });
});
