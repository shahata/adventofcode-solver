import { part1, part2 } from "./day09.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day09 2020", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "35",
            "20",
            "15",
            "25",
            "47",
            "40",
            "62",
            "55",
            "65",
            "95",
            "102",
            "117",
            "150",
            "182",
            "127",
            "219",
            "299",
            "277",
            "309",
            "576",
          ].join("\n"),
          5,
        ),
      ).toEqual(127);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(1124361034);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "35",
            "20",
            "15",
            "25",
            "47",
            "40",
            "62",
            "55",
            "65",
            "95",
            "102",
            "117",
            "150",
            "182",
            "127",
            "219",
            "299",
            "277",
            "309",
            "576",
          ].join("\n"),
          5,
        ),
      ).toEqual(62);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(129444555);
    });
  });
});
