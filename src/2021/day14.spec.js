import { part1, part2 } from "./day14.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day14 2021", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "NNCB",
            "",
            "CH -> B",
            "HH -> N",
            "CB -> H",
            "NH -> C",
            "HB -> C",
            "HC -> B",
            "HN -> C",
            "NN -> C",
            "BH -> H",
            "NC -> B",
            "NB -> B",
            "BN -> B",
            "BB -> N",
            "BC -> B",
            "CC -> N",
            "CN -> C",
          ].join("\n"),
        ),
      ).toEqual(1588);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(2657);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "NNCB",
            "",
            "CH -> B",
            "HH -> N",
            "CB -> H",
            "NH -> C",
            "HB -> C",
            "HC -> B",
            "HN -> C",
            "NN -> C",
            "BH -> H",
            "NC -> B",
            "NB -> B",
            "BN -> B",
            "BB -> N",
            "BC -> B",
            "CC -> N",
            "CN -> C",
          ].join("\n"),
        ),
      ).toEqual(2188189693529);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(2911561572630);
    });
  });
});
