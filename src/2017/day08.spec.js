import { part1, part2 } from "./day08.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day08 2017", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "b inc 5 if a > 1",
            "a inc 1 if b < 5",
            "c dec -10 if a >= 1",
            "c inc -20 if c == 10",
          ].join("\n"),
        ),
      ).toEqual(1);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(5143);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "b inc 5 if a > 1",
            "a inc 1 if b < 5",
            "c dec -10 if a >= 1",
            "c inc -20 if c == 10",
          ].join("\n"),
        ),
      ).toEqual(10);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(6209);
    });
  });
});
