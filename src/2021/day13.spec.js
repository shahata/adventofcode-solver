import { part1, part2 } from "./day13.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day13 2021", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "6,10",
            "0,14",
            "9,10",
            "0,3",
            "10,4",
            "4,11",
            "6,0",
            "6,12",
            "4,1",
            "0,13",
            "10,12",
            "3,4",
            "3,0",
            "8,4",
            "1,10",
            "2,14",
            "8,10",
            "9,0",
            "",
            "fold along y=7",
            "fold along x=5",
          ].join("\n"),
        ),
      ).toEqual(17);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(775);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual("REUPUPKR");
    });
  });
});
