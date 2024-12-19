import { part1, part2 } from "./day19.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day19 2024", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "r, wr, b, g, bwu, rb, gb, br",
            "",
            "brwrr",
            "bggr",
            "gbbr",
            "rrbgbr",
            "ubwu",
            "bwurrg",
            "brgr",
            "bbrgwb",
          ].join("\n"),
        ),
      ).toEqual(6);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(344);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "r, wr, b, g, bwu, rb, gb, br",
            "",
            "brwrr",
            "bggr",
            "gbbr",
            "rrbgbr",
            "ubwu",
            "bwurrg",
            "brgr",
            "bbrgwb",
          ].join("\n"),
        ),
      ).toEqual(16);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(996172272010026);
    });
  });
});
