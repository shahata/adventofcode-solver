import { part1, part2 } from "./day07.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day07 2018", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "Step C must be finished before step A can begin.",
            "Step C must be finished before step F can begin.",
            "Step A must be finished before step B can begin.",
            "Step A must be finished before step D can begin.",
            "Step B must be finished before step E can begin.",
            "Step D must be finished before step E can begin.",
            "Step F must be finished before step E can begin.",
          ].join("\n"),
        ),
      ).toEqual("CABDFE");
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual("IJLFUVDACEHGRZPNKQWSBTMXOY");
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "Step C must be finished before step A can begin.",
            "Step C must be finished before step F can begin.",
            "Step A must be finished before step B can begin.",
            "Step A must be finished before step D can begin.",
            "Step B must be finished before step E can begin.",
            "Step D must be finished before step E can begin.",
            "Step F must be finished before step E can begin.",
          ].join("\n"),
          2,
          0,
        ),
      ).toEqual(15);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(1072);
    });
  });
});
