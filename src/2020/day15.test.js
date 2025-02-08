import { part1, part2 } from "./day15.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day15 2020", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1("0,3,6")).toEqual(436);
      expect(part1("1,3,2")).toEqual(1);
      expect(part1("2,1,3")).toEqual(10);
      expect(part1("1,2,3")).toEqual(27);
      expect(part1("2,3,1")).toEqual(78);
      expect(part1("3,2,1")).toEqual(438);
      expect(part1("3,1,2")).toEqual(1836);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(763);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2("0,3,6")).toEqual(175594);
      // expect(part2('1,3,2')).toEqual(2578);
      // expect(part2('2,1,3')).toEqual(3544142);
      // expect(part2('1,2,3')).toEqual(261214);
      // expect(part2('2,3,1')).toEqual(6895259);
      // expect(part2('3,2,1')).toEqual(18);
      // expect(part2('3,1,2')).toEqual(362);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(1876406);
    });
  });
});
