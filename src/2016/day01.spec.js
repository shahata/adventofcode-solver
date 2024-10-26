import { day } from "./day01.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day01 2016", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(day("R2, R2, R2").part1).toEqual(2);
      expect(day("R2, L3").part1).toEqual(5);
      expect(day("R5, L5, R5, R3").part1).toEqual(12);
    });

    test("it should work for part 1 input", () => {
      expect(day(input).part1).toEqual(353);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(day("R8, R4, R4, R8").part2).toEqual(4);
    });

    test("it should work for part 2 input", () => {
      expect(day(input).part2).toEqual(152);
    });
  });
});
