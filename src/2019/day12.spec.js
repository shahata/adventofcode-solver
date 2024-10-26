import { part1, part2 } from "./day12.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day12 2019", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "<x=-1, y=0, z=2>",
            "<x=2, y=-10, z=-7>",
            "<x=4, y=-8, z=8>",
            "<x=3, y=5, z=-1>",
          ].join("\n"),
          10,
        ),
      ).toEqual(179);
      expect(
        part1(
          [
            "<x=-8, y=-10, z=0>",
            "<x=5, y=5, z=10>",
            "<x=2, y=-7, z=3>",
            "<x=9, y=-8, z=-3>",
          ].join("\n"),
          100,
        ),
      ).toEqual(1940);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input, 1000)).toEqual(6735);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "<x=-1, y=0, z=2>",
            "<x=2, y=-10, z=-7>",
            "<x=4, y=-8, z=8>",
            "<x=3, y=5, z=-1>",
          ].join("\n"),
        ),
      ).toEqual(2772);
      expect(
        part2(
          [
            "<x=-8, y=-10, z=0>",
            "<x=5, y=5, z=10>",
            "<x=2, y=-7, z=3>",
            "<x=9, y=-8, z=-3>",
          ].join("\n"),
        ),
      ).toEqual(4686774924);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(326489627728984);
    });
  });
});
