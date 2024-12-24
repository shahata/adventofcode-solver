import { part1, part2 } from "./day22.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day22 2019", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "deal with increment 7",
            "deal into new stack",
            "deal into new stack",
          ].join("\n"),
          10,
          0,
        ),
      ).toEqual(0);
      expect(
        part1(
          ["cut 6", "deal with increment 7", "deal into new stack"].join("\n"),
          10,
          0,
        ),
      ).toEqual(1);
      expect(
        part1(
          ["deal with increment 7", "deal with increment 9", "cut -2"].join(
            "\n",
          ),
          10,
          0,
        ),
      ).toEqual(2);
      expect(
        part1(
          [
            "deal into new stack",
            "cut -2",
            "deal with increment 7",
            "cut 8",
            "cut -4",
            "deal with increment 7",
            "cut 3",
            "deal with increment 9",
            "deal with increment 3",
            "cut -1",
          ].join("\n"),
          10,
          0,
        ),
      ).toEqual(7);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(1252);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(46116012647793);
    });
  });
});
