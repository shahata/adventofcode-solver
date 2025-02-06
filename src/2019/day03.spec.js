import { part1, part2 } from "./day03.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day03 2019", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1(["R8,U5,L5,D3", "U7,R6,D4,L4"].join("\n"))).toEqual(6);
      expect(
        part1(
          [
            "R75,D30,R83,U83,L12,D49,R71,U7,L72",
            "U62,R66,U55,R34,D71,R55,D58,R83",
          ].join("\n"),
        ),
      ).toEqual(159);
      expect(
        part1(
          [
            "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51",
            "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7",
          ].join("\n"),
        ),
      ).toEqual(135);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(651);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2(["R8,U5,L5,D3", "U7,R6,D4,L4"].join("\n"))).toEqual(30);
      expect(
        part2(
          [
            "R75,D30,R83,U83,L12,D49,R71,U7,L72",
            "U62,R66,U55,R34,D71,R55,D58,R83",
          ].join("\n"),
        ),
      ).toEqual(610);
      expect(
        part2(
          [
            "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51",
            "U98,R91,D20,R16,D67,R40,U7,R15,U6,R7",
          ].join("\n"),
        ),
      ).toEqual(410);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(7534);
    });
  });
});
