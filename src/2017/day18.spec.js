import { part1, part2 } from "./day18.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day18 2017", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "set a 1",
            "add a 2",
            "mul a a",
            "mod a 5",
            "snd a",
            "set a 0",
            "rcv a",
            "jgz a -1",
            "set a 1",
            "jgz a -2",
          ].join("\n"),
        ),
      ).toEqual(4);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(4601);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(6858);
    });
  });
});
