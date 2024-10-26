import { part1, part2 } from "./day10.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day10 2017", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1("3,4,1,5", 5)).toEqual(12);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(9656);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2("")).toEqual("a2582a3a0e66e6e86e3812dcb672a272");
      expect(part2("AoC 2017")).toEqual("33efeb34ea91902bb2f59c9920caa6cd");
      expect(part2("1,2,3")).toEqual("3efbe78a8d82f29979031a4aa0b16a9d");
      expect(part2("1,2,4")).toEqual("63960835bcdc130f0b66d7ff4f6a5a8e");
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual("20b7b54c92bf73cf3e5631458a715149");
    });
  });
});
