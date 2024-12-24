import { part1, part2 } from "./day09.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day09 2018", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1("9 players; last marble is worth 25")).toEqual(32);
      expect(part1("10 players; last marble is worth 1618")).toEqual(8317);
      expect(part1("13 players; last marble is worth 7999 points")).toEqual(
        146373,
      );
      expect(part1("17 players; last marble is worth 1104 points")).toEqual(
        2764,
      );
      expect(part1("21 players; last marble is worth 6111 points")).toEqual(
        54718,
      );
      expect(part1("30 players; last marble is worth 5807 points")).toEqual(
        37305,
      );
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(439089);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(3668541094);
    });
  });
});
