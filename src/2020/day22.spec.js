import { part1, part2 } from "./day22.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day22 2020", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "Player 1:",
            "9",
            "2",
            "6",
            "3",
            "1",
            "",
            "Player 2:",
            "5",
            "8",
            "4",
            "7",
            "10",
          ].join("\n"),
        ),
      ).toEqual(306);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(33421);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "Player 1:",
            "9",
            "2",
            "6",
            "3",
            "1",
            "",
            "Player 2:",
            "5",
            "8",
            "4",
            "7",
            "10",
          ].join("\n"),
        ),
      ).toEqual(291);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(33651);
    });
  });
});
