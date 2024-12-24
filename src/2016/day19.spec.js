import { part1, part2 } from "./day19.js";
import readInput from "../utils/read-input.js";

let input = readInput(import.meta.url);

describe("day19 2016", () => {
  describe("part1", () => {
    test("it should work for part 1 examples", () => {
      expect(part1("5")).toEqual(3);
    });

    test("it should work for part 1 input", () => {
      expect(part1(input)).toEqual(1816277);
    });
  });

  describe("part2", () => {
    test("it should work for part 2 examples", () => {
      expect(part2("1")).toEqual(1); // 3 ** 0

      expect(part2("2")).toEqual(1);
      expect(part2("3")).toEqual(3); // 3 ** 1

      expect(part2("4")).toEqual(1);
      expect(part2("5")).toEqual(2);
      expect(part2("6")).toEqual(3); // (3 ** 1) * 2
      expect(part2("7")).toEqual(5);
      expect(part2("8")).toEqual(7);
      expect(part2("9")).toEqual(9); // 3 ** 2

      expect(part2("10")).toEqual(1);
      expect(part2("11")).toEqual(2);
      expect(part2("12")).toEqual(3);
      expect(part2("13")).toEqual(4);
      expect(part2("14")).toEqual(5);
      expect(part2("15")).toEqual(6);
      expect(part2("16")).toEqual(7);
      expect(part2("17")).toEqual(8);
      expect(part2("18")).toEqual(9); // (3 ** 2) * 2
      expect(part2("19")).toEqual(11);
      expect(part2("20")).toEqual(13);
      expect(part2("21")).toEqual(15);
      expect(part2("22")).toEqual(17);
      expect(part2("23")).toEqual(19);
      expect(part2("24")).toEqual(21);
      expect(part2("25")).toEqual(23);
      expect(part2("26")).toEqual(25);
      expect(part2("27")).toEqual(27); // 3 ** 3

      expect(part2("28")).toEqual(1);
      expect(part2("29")).toEqual(2);
      expect(part2("30")).toEqual(3);
      expect(part2("31")).toEqual(4);
      expect(part2("32")).toEqual(5);
      expect(part2("33")).toEqual(6);
      expect(part2("34")).toEqual(7);
      expect(part2("35")).toEqual(8);
      expect(part2("36")).toEqual(9);
      expect(part2("37")).toEqual(10);
      expect(part2("38")).toEqual(11);
      expect(part2("39")).toEqual(12);
      expect(part2("40")).toEqual(13);
      expect(part2("41")).toEqual(14);
      expect(part2("42")).toEqual(15);
      expect(part2("43")).toEqual(16);
      expect(part2("44")).toEqual(17);
      expect(part2("45")).toEqual(18);
      expect(part2("46")).toEqual(19);
      expect(part2("47")).toEqual(20);
      expect(part2("48")).toEqual(21);
      expect(part2("49")).toEqual(22);
      expect(part2("50")).toEqual(23);
      expect(part2("51")).toEqual(24);
      expect(part2("52")).toEqual(25);
      expect(part2("53")).toEqual(26);
      expect(part2("54")).toEqual(27); // (3 ** 3) * 2
      expect(part2("55")).toEqual(29);
      expect(part2("56")).toEqual(31);
      expect(part2("57")).toEqual(33);
      expect(part2("58")).toEqual(35);
      expect(part2("59")).toEqual(37);
      expect(part2("60")).toEqual(39);
      expect(part2("61")).toEqual(41);
      expect(part2("62")).toEqual(43);
      expect(part2("63")).toEqual(45);
      expect(part2("64")).toEqual(47);
      expect(part2("65")).toEqual(49);
      expect(part2("66")).toEqual(51);
      expect(part2("67")).toEqual(53);
      expect(part2("68")).toEqual(55);
      expect(part2("69")).toEqual(57);
      expect(part2("70")).toEqual(59);
      expect(part2("71")).toEqual(61);
      expect(part2("72")).toEqual(63);
      expect(part2("73")).toEqual(65);
      expect(part2("74")).toEqual(67);
      expect(part2("75")).toEqual(69);
      expect(part2("76")).toEqual(71);
      expect(part2("77")).toEqual(73);
      expect(part2("78")).toEqual(75);
      expect(part2("79")).toEqual(77);
      expect(part2("80")).toEqual(79);
      expect(part2("81")).toEqual(81); // 3 ** 4

      expect(part2("82")).toEqual(1);
      expect(part2("83")).toEqual(2);
      expect(part2("84")).toEqual(3);
      expect(part2("85")).toEqual(4);
      expect(part2("86")).toEqual(5);
      expect(part2("87")).toEqual(6);
      expect(part2("88")).toEqual(7);
      expect(part2("89")).toEqual(8);
      expect(part2("90")).toEqual(9);
      expect(part2("91")).toEqual(10);
      expect(part2("92")).toEqual(11);
      expect(part2("93")).toEqual(12);
      expect(part2("94")).toEqual(13);
      expect(part2("95")).toEqual(14);
      expect(part2("96")).toEqual(15);
      expect(part2("97")).toEqual(16);
      expect(part2("98")).toEqual(17);
      expect(part2("99")).toEqual(18);
      expect(part2("100")).toEqual(19);
    });

    test("it should work for part 2 input", () => {
      expect(part2(input)).toEqual(1410967);
    });
  });
});
