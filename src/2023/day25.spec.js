import { part1, part2 } from "./day25.js";
import readInput from "../utils/read-input.js";

const input = readInput(import.meta.url);

describe("day25 2023", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "jqt: rhn xhk nvd",
            "rsh: frs pzl lsr",
            "xhk: hfx",
            "cmg: qnr nvd lhk bvb",
            "rhn: xhk bvb hfx",
            "bvb: xhk hfx",
            "pzl: lsr hfx nvd",
            "qnr: nvd",
            "ntq: jqt hfx bvb xhk",
            "nvd: lhk",
            "lsr: lhk",
            "rzs: qnr cmg lsr rsh",
            "frs: qnr lhk lsr",
          ].join("\n"),
        ),
      ).toEqual(54);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(562978);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 input", () => {
      expect(part2()).toEqual(undefined);
    });
  });
});
