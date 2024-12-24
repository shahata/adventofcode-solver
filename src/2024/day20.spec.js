import { part1, part2 } from "./day20.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day20 2024", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "###############",
            "#...#...#.....#",
            "#.#.#.#.#.###.#",
            "#S#...#.#.#...#",
            "#######.#.#.###",
            "#######.#.#...#",
            "#######.#.###.#",
            "###..E#...#...#",
            "###.#######.###",
            "#...###...#...#",
            "#.#####.#.###.#",
            "#.#...#.#.#...#",
            "#.#.#.#.#.#.###",
            "#...#...#...###",
            "###############",
          ].join("\n"),
          2,
        ),
      ).toEqual(44);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(1459);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "###############",
            "#...#...#.....#",
            "#.#.#.#.#.###.#",
            "#S#...#.#.#...#",
            "#######.#.#.###",
            "#######.#.#...#",
            "#######.#.###.#",
            "###..E#...#...#",
            "###.#######.###",
            "#...###...#...#",
            "#.#####.#.###.#",
            "#.#...#.#.#...#",
            "#.#.#.#.#.#.###",
            "#...#...#...###",
            "###############",
          ].join("\n"),
          50,
        ),
      ).toEqual(285);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(1016066);
    });
  });
});
