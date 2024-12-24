import { part1, part2 } from "./day22.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day22 2024", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1(["1", "10", "100", "2024"].join("\n"))).toEqual(37327623n);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(17612566393n);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2(["1", "2", "3", "2024"].join("\n"))).toEqual(23);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(1968);
    });
  });
});
