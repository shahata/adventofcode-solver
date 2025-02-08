import { part1, part2 } from "./day10.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day10 2024", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "...0...",
            "...1...",
            "...2...",
            "6543456",
            "7.....7",
            "8.....8",
            "9.....9",
          ].join("\n"),
        ),
      ).toEqual(2);

      expect(
        part1(
          [
            "..90..9",
            "...1.98",
            "...2..7",
            "6543456",
            "765.987",
            "876....",
            "987....",
          ].join("\n"),
        ),
      ).toEqual(4);

      expect(
        part1(
          [
            "10..9..",
            "2...8..",
            "3...7..",
            "4567654",
            "...8..3",
            "...9..2",
            ".....01",
          ].join("\n"),
        ),
      ).toEqual(3);

      expect(
        part1(
          [
            "89010123",
            "78121874",
            "87430965",
            "96549874",
            "45678903",
            "32019012",
            "01329801",
            "10456732",
          ].join("\n"),
        ),
      ).toEqual(36);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(841);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            ".....0.",
            "..4321.",
            "..5..2.",
            "..6543.",
            "..7..4.",
            "..8765.",
            "..9....",
          ].join("\n"),
        ),
      ).toEqual(3);

      expect(
        part2(
          [
            "..90..9",
            "...1.98",
            "...2..7",
            "6543456",
            "765.987",
            "876....",
            "987....",
          ].join("\n"),
        ),
      ).toEqual(13);

      expect(
        part2(
          ["012345", "123456", "234567", "345678", "4.6789", "56789."].join(
            "\n",
          ),
        ),
      ).toEqual(227);

      expect(
        part2(
          [
            "89010123",
            "78121874",
            "87430965",
            "96549874",
            "45678903",
            "32019012",
            "01329801",
            "10456732",
          ].join("\n"),
        ),
      ).toEqual(81);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(1875);
    });
  });
});
