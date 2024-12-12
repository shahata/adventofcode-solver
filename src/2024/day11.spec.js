import { part1, part2 } from "./day11.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day11 2024", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1(["125 17"].join("\n"))).toEqual(55312);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(197157);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(234430066982597);
    });
  });
});
