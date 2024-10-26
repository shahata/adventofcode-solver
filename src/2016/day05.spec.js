import { day } from "./day05.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day05 2016", () => {
  test("it should work for examples", () => {
    const { part1, part2 } = day("abc");
    expect(part1).toEqual("18f47a30");
    expect(part2).toEqual("05ace8e3");
  });

  test("it should work for input", () => {
    const { part1, part2 } = day(input);
    expect(part1).toEqual("f97c354d");
    expect(part2).toEqual("863dde27");
  });
});
