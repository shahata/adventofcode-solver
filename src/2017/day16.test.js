import { part1, part2 } from "./day16.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day16 2017", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1("s1,x3/4,pe/b", "abcde")).toEqual("baedc");
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual("olgejankfhbmpidc");
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2("s1,x3/4,pe/b", "abcde", 2)).toEqual("ceadb");
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual("gfabehpdojkcimnl");
    });
  });
});
