import { part1, part2 } from "./day10.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day10 2020", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "28",
            "33",
            "18",
            "42",
            "31",
            "14",
            "46",
            "20",
            "48",
            "47",
            "24",
            "23",
            "49",
            "45",
            "19",
            "38",
            "39",
            "11",
            "1",
            "32",
            "25",
            "35",
            "8",
            "17",
            "7",
            "9",
            "4",
            "2",
            "34",
            "10",
            "3",
          ].join("\n"),
        ),
      ).toEqual(220);

      expect(
        part1(
          ["16", "10", "15", "5", "1", "11", "7", "19", "6", "12", "4"].join(
            "\n",
          ),
        ),
      ).toEqual(35);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(1820);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          ["16", "10", "15", "5", "1", "11", "7", "19", "6", "12", "4"].join(
            "\n",
          ),
        ),
      ).toEqual(8);

      expect(
        part2(
          [
            "28",
            "33",
            "18",
            "42",
            "31",
            "14",
            "46",
            "20",
            "48",
            "47",
            "24",
            "23",
            "49",
            "45",
            "19",
            "38",
            "39",
            "11",
            "1",
            "32",
            "25",
            "35",
            "8",
            "17",
            "7",
            "9",
            "4",
            "2",
            "34",
            "10",
            "3",
          ].join("\n"),
        ),
      ).toEqual(19208);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(3454189699072);
    });
  });
});
