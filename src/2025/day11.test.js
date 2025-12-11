import { part1, part2 } from "./day11.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day11 2025", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "aaa: you hhh",
            "you: bbb ccc",
            "bbb: ddd eee",
            "ccc: ddd eee fff",
            "ddd: ggg",
            "eee: out",
            "fff: out",
            "ggg: out",
            "hhh: ccc fff iii",
            "iii: out",
          ].join("\n"),
        ),
      ).toEqual(5);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(506);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "svr: aaa bbb",
            "aaa: fft",
            "fft: ccc",
            "bbb: tty",
            "tty: ccc",
            "ccc: ddd eee",
            "ddd: hub",
            "hub: fff",
            "eee: dac",
            "dac: fff",
            "fff: ggg hhh",
            "ggg: out",
            "hhh: out",
          ].join("\n"),
        ),
      ).toEqual(2);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(385912350172800);
    });
  });
});
