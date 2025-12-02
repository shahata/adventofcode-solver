import { part1, part2 } from "./day02.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day02 2025", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,",
            "1698522-1698528,446443-446449,38593856-38593862,565653-565659,",
            "824824821-824824827,2121212118-2121212124",
          ].join(""),
        ),
      ).toEqual(1227775554);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(23039913998);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,",
            "1698522-1698528,446443-446449,38593856-38593862,565653-565659,",
            "824824821-824824827,2121212118-2121212124",
          ].join(""),
        ),
      ).toEqual(4174379265);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(35950619148);
    });
  });
});
