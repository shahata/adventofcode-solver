import { part1, part2 } from "./day21.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day21 2021", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "Player 1 starting position: 4",
            "Player 2 starting position: 8",
          ].join("\n"),
        ),
      ).toEqual(739785);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(908091);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "Player 1 starting position: 4",
            "Player 2 starting position: 8",
          ].join("\n"),
        ),
      ).toEqual(444356092776315);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(190897246590017);
    });
  });
});
