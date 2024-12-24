import { part1, part2 } from "./day04.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day04 2017", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          ["aa bb cc dd ee", "aa bb cc dd aa", "aa bb cc dd aaa"].join("\n"),
        ),
      ).toEqual(2);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(325);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "abcde fghij",
            "abcde xyz ecdab",
            "a ab abc abd abf abj",
            "iiii oiii ooii oooi oooo",
            "oiii ioii iioi iiio",
          ].join("\n"),
        ),
      ).toEqual(3);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(119);
    });
  });
});
