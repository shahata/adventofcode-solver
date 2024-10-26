import { part1, part2 } from "./day14.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day14 2018", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1("9")).toEqual("5158916779");
      expect(part1("5")).toEqual("0124515891");
      expect(part1("18")).toEqual("9251071085");
      expect(part1("2018")).toEqual("5941429882");
    });
    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual("2107929416");
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2("51589")).toEqual(9);
      expect(part2("01245")).toEqual(5);
      expect(part2("92510")).toEqual(18);
      expect(part2("59414")).toEqual(2018);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(20307394);
    });
  });
});
