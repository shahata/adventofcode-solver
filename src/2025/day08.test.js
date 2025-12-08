import { part1, part2 } from "./day08.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day08 2025", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "162,817,812",
            "57,618,57",
            "906,360,560",
            "592,479,940",
            "352,342,300",
            "466,668,158",
            "542,29,236",
            "431,825,988",
            "739,650,466",
            "52,470,668",
            "216,146,977",
            "819,987,18",
            "117,168,530",
            "805,96,715",
            "346,949,466",
            "970,615,88",
            "941,993,340",
            "862,61,35",
            "984,92,344",
            "425,690,689",
          ].join("\n"),
          10,
        ),
      ).toEqual(40);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(140008);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "162,817,812",
            "57,618,57",
            "906,360,560",
            "592,479,940",
            "352,342,300",
            "466,668,158",
            "542,29,236",
            "431,825,988",
            "739,650,466",
            "52,470,668",
            "216,146,977",
            "819,987,18",
            "117,168,530",
            "805,96,715",
            "346,949,466",
            "970,615,88",
            "941,993,340",
            "862,61,35",
            "984,92,344",
            "425,690,689",
          ].join("\n"),
        ),
      ).toEqual(25272);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(9253260633);
    });
  });
});
