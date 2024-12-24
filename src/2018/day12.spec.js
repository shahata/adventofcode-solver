import { part1, part2 } from "./day12.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day12 2018", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "initial state: #..#.#..##......###...###",
            "",
            "...## => #",
            "..#.. => #",
            ".#... => #",
            ".#.#. => #",
            ".#.## => #",
            ".##.. => #",
            ".#### => #",
            "#.#.# => #",
            "#.### => #",
            "##.#. => #",
            "##.## => #",
            "###.. => #",
            "###.# => #",
            "####. => #",
          ].join("\n"),
        ),
      ).toEqual(325);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(4386);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(5450000001166);
    });
  });
});
