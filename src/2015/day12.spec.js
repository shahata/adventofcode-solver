import { part1, part2 } from "./day12.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day12 2015", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1("[1,2,3]")).toEqual(6);
      expect(part1('{"a":2,"b":4}')).toEqual(6);
      expect(part1("[[[3]]]")).toEqual(3);
      expect(part1('{"a":{"b":4},"c":-1}')).toEqual(3);
      expect(part1('{"a":[-1,1]}')).toEqual(0);
      expect(part1('[-1,{"a":1}]')).toEqual(0);
      expect(part1("[]")).toEqual(0);
      expect(part1("{}")).toEqual(0);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(119433);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2("[1,2,3]")).toEqual(6);
      expect(part2('[1,{"c":"red","b":2},3]')).toEqual(4);
      expect(part2('{"d":"red","e":[1,2,3,4],"f":5}')).toEqual(0);
      expect(part2('[1,"red",5]')).toEqual(6);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(68466);
    });
  });
});
