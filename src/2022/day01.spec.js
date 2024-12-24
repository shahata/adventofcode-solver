import { part1, part2 } from "./day01.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day01 2022", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "1000",
            "2000",
            "3000",
            "",
            "4000",
            "",
            "5000",
            "6000",
            "",
            "7000",
            "8000",
            "9000",
            "",
            "10000",
          ].join("\n"),
        ),
      ).toEqual(24000);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(72070);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "1000",
            "2000",
            "3000",
            "",
            "4000",
            "",
            "5000",
            "6000",
            "",
            "7000",
            "8000",
            "9000",
            "",
            "10000",
          ].join("\n"),
        ),
      ).toEqual(45000);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(211805);
    });
  });
});
