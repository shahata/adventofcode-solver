import { part1, part2 } from "./day21.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day21 2019", () => {
  describe("part1", () => {
    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(19357761);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(1142249706);
    });
  });
});
