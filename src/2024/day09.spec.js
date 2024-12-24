import { part1, part2 } from "./day09.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day09 2024", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1("2333133121414131402")).toEqual(1928);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(6385338159127);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2("2333133121414131402")).toEqual(2858);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(6415163624282);
    });
  });
});
