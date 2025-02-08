import { part1, part2 } from "./day17.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day17 2024", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "Register A: 729",
            "Register B: 0",
            "Register C: 0",
            "",
            "Program: 0,1,5,4,3,0",
          ].join("\n"),
        ),
      ).toEqual("4,6,3,5,6,3,5,2,1,0");
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual("6,2,7,2,3,1,6,0,5");
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "Register A: 2024",
            "Register B: 0",
            "Register C: 0",
            "",
            "Program: 0,3,5,4,3,0",
          ].join("\n"),
        ),
      ).toEqual(117440n);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(236548287712877n);
    });
  });
});
