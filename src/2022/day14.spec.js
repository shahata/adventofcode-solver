import { part1, part2 } from "./day14.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day14 2022", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          ["498,4 -> 498,6 -> 496,6", "503,4 -> 502,4 -> 502,9 -> 494,9"].join(
            "\n",
          ),
        ),
      ).toEqual(24);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(625);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          ["498,4 -> 498,6 -> 496,6", "503,4 -> 502,4 -> 502,9 -> 494,9"].join(
            "\n",
          ),
        ),
      ).toEqual(93);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(25193);
    });
  });
});
