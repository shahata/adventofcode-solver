import { part1, part2 } from "./day25.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day25 2022", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "1=-0-2",
            "12111",
            "2=0=",
            "21",
            "2=01",
            "111",
            "20012",
            "112",
            "1=-1=",
            "1-12",
            "12",
            "1=",
            "122",
          ].join("\n"),
        ),
      ).toEqual("2=-1=0");
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual("20=02=120-=-2110-0=1");
    });
  });

  describe("part2", () => {
    test("it should work for part 2 input", () => {
      expect(part2()).toEqual(undefined);
    });
  });
});
