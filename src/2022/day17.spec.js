import { part1, part2 } from "./day17.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day17 2022", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1(">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>")).toEqual(3068);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(3168);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2(">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>")).toEqual(
        1514285714288,
      );
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(1554117647070);
    });
  });
});
