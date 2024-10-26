import { part1, part2 } from "./day09.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day09 2021", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "2199943210",
            "3987894921",
            "9856789892",
            "8767896789",
            "9899965678",
          ].join("\n"),
        ),
      ).toEqual(15);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(530);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "2199943210",
            "3987894921",
            "9856789892",
            "8767896789",
            "9899965678",
          ].join("\n"),
        ),
      ).toEqual(1134);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(1019494);
    });
  });
});
