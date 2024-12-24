import { part1, part2 } from "./day04.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day04 2024", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "MMMSXXMASM",
            "MSAMXMSMSA",
            "AMXSXMAAMM",
            "MSAMASMSMX",
            "XMASAMXAMM",
            "XXAMMXXAMA",
            "SMSMSASXSS",
            "SAXAMASAAA",
            "MAMMMXMMMM",
            "MXMXAXMASX",
          ].join("\n"),
        ),
      ).toEqual(18);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(2603);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "MMMSXXMASM",
            "MSAMXMSMSA",
            "AMXSXMAAMM",
            "MSAMASMSMX",
            "XMASAMXAMM",
            "XXAMMXXAMA",
            "SMSMSASXSS",
            "SAXAMASAAA",
            "MAMMMXMMMM",
            "MXMXAXMASX",
          ].join("\n"),
        ),
      ).toEqual(9);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(1965);
    });
  });
});
