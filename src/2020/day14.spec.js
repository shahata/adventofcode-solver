import { part1, part2 } from "./day14.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day14 2020", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X",
            "mem[8] = 11",
            "mem[7] = 101",
            "mem[8] = 0",
          ].join("\n"),
        ),
      ).toEqual(165);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(11179633149677);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "mask = 000000000000000000000000000000X1001X",
            "mem[42] = 100",
            "mask = 00000000000000000000000000000000X0XX",
            "mem[26] = 1",
          ].join("\n"),
        ),
      ).toEqual(208);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(4822600194774);
    });
  });
});
