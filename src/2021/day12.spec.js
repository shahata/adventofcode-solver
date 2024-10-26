import { part1, part2 } from "./day12.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day12 2021", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          ["start-A", "start-b", "A-c", "A-b", "b-d", "A-end", "b-end"].join(
            "\n",
          ),
        ),
      ).toEqual(10);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(4378);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          ["start-A", "start-b", "A-c", "A-b", "b-d", "A-end", "b-end"].join(
            "\n",
          ),
        ),
      ).toEqual(36);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(133621);
    });
  });
});
