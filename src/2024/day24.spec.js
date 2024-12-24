import { part1, part2, oldpart2 } from "./day24.js";
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
    test("it should work for part 2 examples", () => {
      expect(
        oldpart2(
          [
            "x00: 0",
            "x01: 1",
            "x02: 0",
            "x03: 1",
            "x04: 0",
            "x05: 1",
            "y00: 0",
            "y01: 0",
            "y02: 1",
            "y03: 1",
            "y04: 0",
            "y05: 1",
            "",
            "x00 AND y00 -> z05",
            "x01 AND y01 -> z02",
            "x02 AND y02 -> z01",
            "x03 AND y03 -> z03",
            "x04 AND y04 -> z04",
            "x05 AND y05 -> z00",
          ].join("\n"),
          2,
          (x, y) => x & y,
        ),
      ).toEqual("z00,z01,z02,z05");
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual("btb,cmv,mwp,rdg,rmj,z17,z23,z30");
    });
  });
});
