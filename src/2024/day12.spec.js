import { part1, part2 } from "./day12.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day12 2024", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1(["AAAA", "BBCD", "BBCC", "EEEC"].join("\n"))).toEqual(140);

      expect(
        part1(["OOOOO", "OXOXO", "OOOOO", "OXOXO", "OOOOO"].join("\n")),
      ).toEqual(772);

      expect(
        part1(
          [
            "RRRRIICCFF",
            "RRRRIICCCF",
            "VVRRRCCFFF",
            "VVRCCCJFFF",
            "VVVVCJJCFE",
            "VVIVCCJJEE",
            "VVIIICJJEE",
            "MIIIIIJJEE",
            "MIIISIJEEE",
            "MMMISSJEEE",
          ].join("\n"),
        ),
      ).toEqual(1930);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(1400386);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2(["AAAA", "BBCD", "BBCC", "EEEC"].join("\n"))).toEqual(80);

      expect(
        part2(["OOOOO", "OXOXO", "OOOOO", "OXOXO", "OOOOO"].join("\n")),
      ).toEqual(436);

      expect(
        part2(["EEEEE", "EXXXX", "EEEEE", "EXXXX", "EEEEE"].join("\n")),
      ).toEqual(236);

      expect(
        part2(
          ["AAAAAA", "AAABBA", "AAABBA", "ABBAAA", "ABBAAA", "AAAAAA"].join(
            "\n",
          ),
        ),
      ).toEqual(368);

      expect(
        part2(
          [
            "RRRRIICCFF",
            "RRRRIICCCF",
            "VVRRRCCFFF",
            "VVRCCCJFFF",
            "VVVVCJJCFE",
            "VVIVCCJJEE",
            "VVIIICJJEE",
            "MIIIIIJJEE",
            "MIIISIJEEE",
            "MMMISSJEEE",
          ].join("\n"),
        ),
      ).toEqual(1206);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(851994);
    });
  });
});
