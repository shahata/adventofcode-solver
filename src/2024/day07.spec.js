import { part1, part2 } from "./day07.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day07 2024", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "190: 10 19",
            "3267: 81 40 27",
            "83: 17 5",
            "156: 15 6",
            "7290: 6 8 6 15",
            "161011: 16 10 13",
            "192: 17 8 14",
            "21037: 9 7 18 13",
            "292: 11 6 16 20",
          ].join("\n"),
        ),
      ).toEqual(3749);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(42283209483350);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "190: 10 19",
            "3267: 81 40 27",
            "83: 17 5",
            "156: 15 6",
            "7290: 6 8 6 15",
            "161011: 16 10 13",
            "192: 17 8 14",
            "21037: 9 7 18 13",
            "292: 11 6 16 20",
          ].join("\n"),
        ),
      ).toEqual(11387);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(1026766857276279);
    });
  });
});
