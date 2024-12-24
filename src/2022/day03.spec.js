import { part1, part2 } from "./day03.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day03 2022", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "vJrwpWtwJgWrhcsFMMfFFhFp",
            "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
            "PmmdzqPrVvPwwTWBwg",
            "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
            "ttgJtRGJQctTZtZT",
            "CrZsJsPPZsGzwwsLwLmpwMDw",
          ].join("\n"),
        ),
      ).toEqual(157);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(8123);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "vJrwpWtwJgWrhcsFMMfFFhFp",
            "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
            "PmmdzqPrVvPwwTWBwg",
            "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
            "ttgJtRGJQctTZtZT",
            "CrZsJsPPZsGzwwsLwLmpwMDw",
          ].join("\n"),
        ),
      ).toEqual(70);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(2620);
    });
  });
});
