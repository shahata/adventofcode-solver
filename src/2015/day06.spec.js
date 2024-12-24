import { part1, part2 } from "./day06.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day06 2015", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "turn on 0,0 through 999,999",
            "toggle 0,0 through 999,0",
            "turn off 499,499 through 500,500",
          ].join("\n"),
        ),
      ).toEqual(1e6 - 1e3 - 4);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(400410);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2("turn on 0,0 through 0,0")).toEqual(1);
      expect(part2("toggle 0,0 through 999,999")).toEqual(2e6);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(15343601);
    });
  });
});
