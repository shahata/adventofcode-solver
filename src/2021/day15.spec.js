import { part1, part2 } from "./day15.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day15 2021", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "1163751742",
            "1381373672",
            "2136511328",
            "3694931569",
            "7463417111",
            "1319128137",
            "1359912421",
            "3125421639",
            "1293138521",
            "2311944581",
          ].join("\n"),
        ),
      ).toEqual(40);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(748);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "1163751742",
            "1381373672",
            "2136511328",
            "3694931569",
            "7463417111",
            "1319128137",
            "1359912421",
            "3125421639",
            "1293138521",
            "2311944581",
          ].join("\n"),
        ),
      ).toEqual(315);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(3045);
    });
  });
});
