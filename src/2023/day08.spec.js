import { part1, part2 } from "./day08.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day08 2023", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "LLR",
            "",
            "AAA = (BBB, BBB)",
            "BBB = (AAA, ZZZ)",
            "ZZZ = (ZZZ, ZZZ)",
          ].join("\n"),
        ),
      ).toEqual(6);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(20777);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "LR",
            "",
            "11A = (11B, XXX)",
            "11B = (XXX, 11Z)",
            "11Z = (11B, XXX)",
            "22A = (22B, XXX)",
            "22B = (22C, 22C)",
            "22C = (22Z, 22Z)",
            "22Z = (22B, 22B)",
            "XXX = (XXX, XXX)",
          ].join("\n"),
        ),
      ).toEqual(6);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(13289612809129);
    });
  });
});
