import { part1, part2 } from "./day17.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day17 2021", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1("target area: x=20..30, y=-10..-5")).toEqual(45);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(2278);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2("target area: x=20..30, y=-10..-5")).toEqual(112);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(996);
    });
  });
});
