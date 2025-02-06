import { part1, part2 } from "./day05.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day05 2022", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "    [D]    ",
            "[N] [C]    ",
            "[Z] [M] [P]",
            " 1   2   3 ",
            "",
            "move 1 from 2 to 1",
            "move 3 from 1 to 3",
            "move 2 from 2 to 1",
            "move 1 from 1 to 2",
          ].join("\n"),
        ),
      ).toEqual("CMZ");
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual("RFFFWBPNS");
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "    [D]    ",
            "[N] [C]    ",
            "[Z] [M] [P]",
            " 1   2   3 ",
            "",
            "move 1 from 2 to 1",
            "move 3 from 1 to 3",
            "move 2 from 2 to 1",
            "move 1 from 1 to 2",
          ].join("\n"),
        ),
      ).toEqual("MCD");
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual("CQQBBJFCS");
    });
  });
});
