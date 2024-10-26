import { part1, part2 } from "./day05.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day05 2017", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1(["0", "3", "0", "1", "-3"].join("\n"))).toEqual(5);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(343364);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2(["0", "3", "0", "1", "-3"].join("\n"))).toEqual(10);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(25071947);
    });
  });
});
