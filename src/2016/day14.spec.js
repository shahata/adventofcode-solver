import { part1, part2 } from "./day14.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day14 2016", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1("abc")).toEqual(22728);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(23769);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2("abc")).toEqual(22551);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(20606);
    });
  });
});
