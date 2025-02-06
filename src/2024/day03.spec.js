import { part1, part2 } from "./day03.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day03 2024", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
        ),
      ).toEqual(161);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(160672468);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
        ),
      ).toEqual(48);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(84893551);
    });
  });
});
