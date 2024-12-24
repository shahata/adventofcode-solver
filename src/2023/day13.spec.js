import { part1, part2 } from "./day13.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day13 2023", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "#.##..##.",
            "..#.##.#.",
            "##......#",
            "##......#",
            "..#.##.#.",
            "..##..##.",
            "#.#.##.#.",
            "",
            "#...##..#",
            "#....#..#",
            "..##..###",
            "#####.##.",
            "#####.##.",
            "..##..###",
            "#....#..#",
          ].join("\n"),
        ),
      ).toEqual(405);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(37025);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "#.##..##.",
            "..#.##.#.",
            "##......#",
            "##......#",
            "..#.##.#.",
            "..##..##.",
            "#.#.##.#.",
            "",
            "#...##..#",
            "#....#..#",
            "..##..###",
            "#####.##.",
            "#####.##.",
            "..##..###",
            "#....#..#",
          ].join("\n"),
        ),
      ).toEqual(400);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(32854);
    });
  });
});
