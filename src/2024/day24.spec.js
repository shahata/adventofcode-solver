import { part1, part2 } from "./day24.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day24 2024", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "x00: 1",
            "x01: 1",
            "x02: 1",
            "y00: 0",
            "y01: 1",
            "y02: 0",
            "",
            "x00 AND y00 -> z00",
            "x01 XOR y01 -> z01",
            "x02 OR y02 -> z02",
          ].join("\n"),
        ),
      ).toEqual(4);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(55920211035878);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual("btb,cmv,mwp,rdg,rmj,z17,z23,z30");
    });
  });
});
