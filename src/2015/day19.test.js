import { part1, part2 } from "./day19.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day19 2015", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(["H => HO", "H => OH", "O => HH", "", "HOH"].join("\n")),
      ).toEqual(4);
      expect(
        part1(["H => HO", "H => OH", "O => HH", "", "HOHOHO"].join("\n")),
      ).toEqual(7);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(576);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          ["e => H", "e => O", "H => HO", "H => OH", "O => HH", "", "HOH"].join(
            "\n",
          ),
        ),
      ).toEqual(3);
      expect(
        part2(
          [
            "e => H",
            "e => O",
            "H => HO",
            "H => OH",
            "O => HH",
            "",
            "HOHOHO",
          ].join("\n"),
        ),
      ).toEqual(6);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(207);
    });
  });
});
