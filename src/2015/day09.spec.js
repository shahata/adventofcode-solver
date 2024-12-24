import { part1, part2 } from "./day09.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day09 2015", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "London to Dublin = 464",
            "London to Belfast = 518",
            "Dublin to Belfast = 141",
          ].join("\n"),
        ),
      ).toEqual(605);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(251);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "London to Dublin = 464",
            "London to Belfast = 518",
            "Dublin to Belfast = 141",
          ].join("\n"),
        ),
      ).toEqual(982);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(898);
    });
  });
});
