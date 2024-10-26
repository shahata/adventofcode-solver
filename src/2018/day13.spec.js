import { part1, part2 } from "./day13.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day13 2018", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "/->-\\        ",
            "|   |  /----\\",
            "| /-+--+-\\  |",
            "| | |  | v  |",
            "\\-+-/  \\-+--/",
            "  \\------/   ",
          ].join("\n"),
        ),
      ).toEqual("7,3");
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual("94,78");
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "/>-<\\  ",
            "|   |  ",
            "| /<+-\\",
            "| | | v",
            "\\>+</ |",
            "  |   ^",
            "  \\<->/",
          ].join("\n"),
        ),
      ).toEqual("6,4");
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual("26,85");
    });
  });
});
