import { part1, part2 } from "./day13.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day13 2024", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "Button A: X+94, Y+34",
            "Button B: X+22, Y+67",
            "Prize: X=8400, Y=5400",
            "",
            "Button A: X+26, Y+66",
            "Button B: X+67, Y+21",
            "Prize: X=12748, Y=12176",
            "",
            "Button A: X+17, Y+86",
            "Button B: X+84, Y+37",
            "Prize: X=7870, Y=6450",
            "",
            "Button A: X+69, Y+23",
            "Button B: X+27, Y+71",
            "Prize: X=18641, Y=10279",
          ].join("\n"),
        ),
      ).toEqual(480);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(29388);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      // expect(part2(paste)).toEqual(paste);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(99548032866004);
    });
  });
});
