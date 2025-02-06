import { part1, part2 } from "./day24.js";
import { describe, test, expect } from "vitest";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day24 2018", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "Immune System:",
            "17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 6077 fire damage at initiative 2",
            "989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 1595 slashing damage at initiative 3",
            "",
            "Infection:",
            "801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1",
            "4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4",
          ].join("\n"),
        ),
      ).toEqual(51);

      expect(
        part1(
          [
            "Immune System:",
            "17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2",
            "989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3",
            "",
            "Infection:",
            "801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1",
            "4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4",
          ].join("\n"),
        ),
      ).toEqual(5216);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(26753);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "Immune System:",
            "17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2",
            "989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3",
            "",
            "Infection:",
            "801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1",
            "4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4",
          ].join("\n"),
        ),
      ).toEqual(51);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(1852);
    });
  });
});
