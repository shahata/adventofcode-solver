import { part1, part2 } from "./day13.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day13 2017", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1(["0: 3", "1: 2", "4: 4", "6: 4"].join("\n"))).toEqual(24);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(3184);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2(["0: 3", "1: 2", "4: 4", "6: 4"].join("\n"))).toEqual(10);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(3878062);
    });
  });
});
