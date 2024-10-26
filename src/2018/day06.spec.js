import { part1, part2 } from "./day06.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day06 2018", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(["1, 1", "1, 6", "8, 3", "3, 4", "5, 5", "8, 9"].join("\n")),
      ).toEqual(17);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(5975);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(["1, 1", "1, 6", "8, 3", "3, 4", "5, 5", "8, 9"].join("\n"), 32),
      ).toEqual(16);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(38670);
    });
  });
});
