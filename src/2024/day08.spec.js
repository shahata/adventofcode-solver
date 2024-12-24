import { part1, part2 } from "./day08.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day08 2024", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "............",
            "........0...",
            ".....0......",
            ".......0....",
            "....0.......",
            "......A.....",
            "............",
            "............",
            "........A...",
            ".........A..",
            "............",
            "............",
          ].join("\n"),
        ),
      ).toEqual(14);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(361);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "............",
            "........0...",
            ".....0......",
            ".......0....",
            "....0.......",
            "......A.....",
            "............",
            "............",
            "........A...",
            ".........A..",
            "............",
            "............",
          ].join("\n"),
        ),
      ).toEqual(34);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(1249);
    });
  });
});
