import { part1, part2 } from "./day06.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day06 2016", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "eedadn",
            "drvtee",
            "eandsr",
            "raavrd",
            "atevrs",
            "tsrnev",
            "sdttsa",
            "rasrtv",
            "nssdts",
            "ntnada",
            "svetve",
            "tesnvt",
            "vntsnd",
            "vrdear",
            "dvrsen",
            "enarar",
          ].join("\n"),
        ),
      ).toEqual("easter");
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual("qzedlxso");
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "eedadn",
            "drvtee",
            "eandsr",
            "raavrd",
            "atevrs",
            "tsrnev",
            "sdttsa",
            "rasrtv",
            "nssdts",
            "ntnada",
            "svetve",
            "tesnvt",
            "vntsnd",
            "vrdear",
            "dvrsen",
            "enarar",
          ].join("\n"),
        ),
      ).toEqual("advent");
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual("ucmifjae");
    });
  });
});
