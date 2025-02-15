import { part1, part2 } from "./day23.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day23 2020", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1("389125467", 10)).toEqual("92658374");
      expect(part1("389125467")).toEqual("67384529");
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual("26354798");
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2("389125467")).toEqual(149245887792);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(166298218695);
    });
  });
});
