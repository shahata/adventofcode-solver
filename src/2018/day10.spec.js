import { day } from "./day10.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day10 2018", () => {
  describe("part1", () => {
    test("it should work for example", () => {
      let { part1, part2 } = day(
        [
          "position=< 9,  1> velocity=< 0,  2>",
          "position=< 7,  0> velocity=<-1,  0>",
          "position=< 3, -2> velocity=<-1,  1>",
          "position=< 6, 10> velocity=<-2, -1>",
          "position=< 2, -4> velocity=< 2,  2>",
          "position=<-6, 10> velocity=< 2, -2>",
          "position=< 1,  8> velocity=< 1, -1>",
          "position=< 1,  7> velocity=< 1,  0>",
          "position=<-3, 11> velocity=< 1, -2>",
          "position=< 7,  6> velocity=<-1, -1>",
          "position=<-2,  3> velocity=< 1,  0>",
          "position=<-4,  3> velocity=< 2,  0>",
          "position=<10, -3> velocity=<-1,  1>",
          "position=< 5, 11> velocity=< 1, -2>",
          "position=< 4,  7> velocity=< 0, -1>",
          "position=< 8, -2> velocity=< 0,  1>",
          "position=<15,  0> velocity=<-2,  0>",
          "position=< 1,  6> velocity=< 1,  0>",
          "position=< 8,  9> velocity=< 0, -1>",
          "position=< 3,  3> velocity=<-1,  1>",
          "position=< 0,  5> velocity=< 0, -1>",
          "position=<-2,  2> velocity=< 2,  0>",
          "position=< 5, -2> velocity=< 1,  2>",
          "position=< 1,  4> velocity=< 2,  1>",
          "position=<-2,  7> velocity=< 2, -2>",
          "position=< 3,  6> velocity=<-1, -1>",
          "position=< 5,  0> velocity=< 1,  0>",
          "position=<-6,  0> velocity=< 2,  0>",
          "position=< 5,  9> velocity=< 1, -2>",
          "position=<14,  7> velocity=<-2,  0>",
          "position=<-3,  6> velocity=< 2, -1>",
        ].join("\n"),
      );
      expect(part1).toEqual(
        [
          "",
          "#...#..###",
          "#...#...#.",
          "#...#...#.",
          "#####...#.",
          "#...#...#.",
          "#...#...#.",
          "#...#...#.",
          "#...#..###",
        ].join("\n"),
      );
      expect(part2).toEqual(3);
    });

    test("it should work for input", () => {
      let { part1, part2 } = day(input);
      expect(part1).toEqual("ZZCBGGCJ");
      expect(part2).toEqual(10886);
    });
  });
});
