import { part1, part2 } from "./day19.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day19 2022", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.",
            "Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.",
          ].join("\n"),
        ),
      ).toEqual(33);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(1589);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.",
            "Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.",
          ].join("\n"),
        ),
      ).toEqual(56 * 62);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(29348);
    });
  });
});
