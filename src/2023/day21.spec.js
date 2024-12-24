import { part1, part2 } from "./day21.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);
let example = [
  "...........",
  ".....###.#.",
  ".###.##..#.",
  "..#.#...#..",
  "....#.#....",
  ".##..S####.",
  ".##..#...#.",
  ".......##..",
  ".##.#.####.",
  ".##..##.##.",
  "...........",
].join("\n");

describe("day21 2023", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1(example, 6)).toEqual(16);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(3795);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2(example, 6)).toEqual(16);
      expect(part2(example, 10)).toEqual(50);
      expect(part2(example, 50)).toEqual(1594);
      expect(part2(example, 100)).toEqual(6536);
      // expect(part2(example, 500)).toEqual(167004);
      // expect(part2(example, 1000)).toEqual(668697);
      // expect(part2(example, 5000)).toEqual(16733044);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input, 65)).toEqual(3893); //0
      expect(part2(input, 65 + 131)).toEqual(34785); //1
      expect(part2(input, 65 + 131 + 131)).toEqual(96471); //2
      expect(part2(input)).toEqual(630129824772393); //26501365 / 131 = 202300
    });
  });
});
