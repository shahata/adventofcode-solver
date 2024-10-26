import { part1, part2 } from "./day07.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day07 2023", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          ["32T3K 765", "T55J5 684", "KK677 28", "KTJJT 220", "QQQJA 483"].join(
            "\n",
          ),
        ),
      ).toEqual(6440);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(248812215);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          ["32T3K 765", "T55J5 684", "KK677 28", "KTJJT 220", "QQQJA 483"].join(
            "\n",
          ),
        ),
      ).toEqual(5905);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(250057090);
    });
  });
});
