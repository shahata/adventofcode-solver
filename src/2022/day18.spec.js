import { part1, part2 } from "./day18.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day18 2022", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "2,2,2",
            "1,2,2",
            "3,2,2",
            "2,1,2",
            "2,3,2",
            "2,2,1",
            "2,2,3",
            "2,2,4",
            "2,2,6",
            "1,2,5",
            "3,2,5",
            "2,1,5",
            "2,3,5",
          ].join("\n"),
        ),
      ).toEqual(64);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(4548);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "2,2,2",
            "1,2,2",
            "3,2,2",
            "2,1,2",
            "2,3,2",
            "2,2,1",
            "2,2,3",
            "2,2,4",
            "2,2,6",
            "1,2,5",
            "3,2,5",
            "2,1,5",
            "2,3,5",
          ].join("\n"),
        ),
      ).toEqual(58);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(2588);
    });
  });
});
