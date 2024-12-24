import { part1, part2 } from "./day23.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day23 2024", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(
        part1(
          [
            "kh-tc",
            "qp-kh",
            "de-cg",
            "ka-co",
            "yn-aq",
            "qp-ub",
            "cg-tb",
            "vc-aq",
            "tb-ka",
            "wh-tc",
            "yn-cg",
            "kh-ub",
            "ta-co",
            "de-co",
            "tc-td",
            "tb-wq",
            "wh-td",
            "ta-ka",
            "td-qp",
            "aq-cg",
            "wq-ub",
            "ub-vc",
            "de-ta",
            "wq-aq",
            "wq-vc",
            "wh-yn",
            "ka-de",
            "kh-ta",
            "co-tc",
            "wh-qp",
            "tb-vc",
            "td-yn",
          ].join("\n"),
        ),
      ).toEqual(7);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(1175);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(
        part2(
          [
            "kh-tc",
            "qp-kh",
            "de-cg",
            "ka-co",
            "yn-aq",
            "qp-ub",
            "cg-tb",
            "vc-aq",
            "tb-ka",
            "wh-tc",
            "yn-cg",
            "kh-ub",
            "ta-co",
            "de-co",
            "tc-td",
            "tb-wq",
            "wh-td",
            "ta-ka",
            "td-qp",
            "aq-cg",
            "wq-ub",
            "ub-vc",
            "de-ta",
            "wq-aq",
            "wq-vc",
            "wh-yn",
            "ka-de",
            "kh-ta",
            "co-tc",
            "wh-qp",
            "tb-vc",
            "td-yn",
          ].join("\n"),
        ),
      ).toEqual("co,de,ka,ta");
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual("bw,dr,du,ha,mm,ov,pj,qh,tz,uv,vq,wq,xw");
    });
  });
});
