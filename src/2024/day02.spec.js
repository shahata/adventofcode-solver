import { part1, part2 } from "./day02.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day02 2024", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "7 6 4 2 1",
            "1 2 7 8 9",
            "9 7 6 2 1",
            "1 3 2 4 5",
            "8 6 4 4 1",
            "1 3 6 7 9",
          ].join("\n"),
        ),
      ).toEqual(2);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(490);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "7 6 4 2 1",
            "1 2 7 8 9",
            "9 7 6 2 1",
            "1 3 2 4 5",
            "8 6 4 4 1",
            "1 3 6 7 9",
          ].join("\n"),
        ),
      ).toEqual(4);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(536);
    });
  });
});
