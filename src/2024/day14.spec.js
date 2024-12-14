import { part1, part2 } from "./day14.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day14 2024", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "p=0,4 v=3,-3",
            "p=6,3 v=-1,-3",
            "p=10,3 v=-1,2",
            "p=2,0 v=2,-1",
            "p=0,0 v=1,3",
            "p=3,0 v=-2,-2",
            "p=7,6 v=-1,-3",
            "p=3,0 v=-1,-2",
            "p=9,3 v=2,3",
            "p=7,3 v=-1,2",
            "p=2,4 v=2,-3",
            "p=9,5 v=-3,-3",
          ].join("\n"),
          11,
          7,
        ),
      ).toEqual(12);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(224969976);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      // expect(part2(paste)).toEqual(paste);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(7892);
    });
  });
});
