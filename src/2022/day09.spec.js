import { part1, part2 } from "./day09.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day09 2022", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          ["R 4", "U 4", "L 3", "D 1", "R 4", "D 1", "L 5", "R 2"].join("\n"),
        ),
      ).toEqual(13);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(6376);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          ["R 5", "U 8", "L 8", "D 3", "R 17", "D 10", "L 25", "U 20"].join(
            "\n",
          ),
        ),
      ).toEqual(36);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(2607);
    });
  });
});
