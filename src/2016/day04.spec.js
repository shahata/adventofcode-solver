import { part1, part2 } from "./day04.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day04 2016", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      let s1, s2, s3, s4;
      expect(part1((s1 = "aaaaa-bbb-z-y-x-123[abxyz]"))).toEqual(123);
      expect(part1((s2 = "a-b-c-d-e-f-g-h-987[abcde]"))).toEqual(987);
      expect(part1((s3 = "not-a-real-room-404[oarel]"))).toEqual(404);
      expect(part1((s4 = "totally-real-room-200[decoy]"))).toEqual(0);
      expect(part1([s1, s2, s3, s4].join("\n"))).toEqual(1514);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(245102);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(324);
    });
  });
});
