import { part1, part2 } from "./day18.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day18 2020", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "1 + 2 * 3 + 4 * 5 + 6",
            "2 * 3 + (4 * 5)",
            "5 + (8 * 3 + 9 + 3 * 4 * 3)",
            "5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))",
            "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2",
          ].join("\n"),
        ),
      ).toEqual(71 + 26 + 437 + 12240 + 13632);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(21993583522852);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "1 + 2 * 3 + 4 * 5 + 6",
            "1 + (2 * 3) + (4 * (5 + 6))",
            "2 * 3 + (4 * 5)",
            "5 + (8 * 3 + 9 + 3 * 4 * 3)",
            "5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))",
            "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2",
          ].join("\n"),
        ),
      ).toEqual(231 + 51 + 46 + 1445 + 669060 + 23340);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(122438593522757);
    });
  });
});
