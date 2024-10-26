import { part1, part2 } from "./day03.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day03 2018", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2"].join("\n")),
      ).toEqual(4);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(109143);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(["#1 @ 1,3: 4x4", "#2 @ 3,1: 4x4", "#3 @ 5,5: 2x2"].join("\n")),
      ).toEqual(3);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(506);
    });
  });
});
