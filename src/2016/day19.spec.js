const { part1, part2 } = require('./day19');
const { expect } = require('chai');
const readInput = require('../utils/read-input');

const input = readInput(__filename);

describe('day19 2016', () => {
  describe('part1', () => {
    it('should work for part 1 examples', () => {
      expect(part1('5')).to.equal(3);
    });

    it('should work for part 1 input', () => {
      expect(part1(input)).to.equal(1816277);
    });
  });

  describe('part2', () => {
    it('should work for part 2 examples', () => {
      expect(part2('1')).to.equal(1); // 3 ** 0

      expect(part2('2')).to.equal(1);
      expect(part2('3')).to.equal(3); // 3 ** 1

      expect(part2('4')).to.equal(1);
      expect(part2('5')).to.equal(2);
      expect(part2('6')).to.equal(3); // (3 ** 1) * 2
      expect(part2('7')).to.equal(5);
      expect(part2('8')).to.equal(7);
      expect(part2('9')).to.equal(9); // 3 ** 2

      expect(part2('10')).to.equal(1);
      expect(part2('11')).to.equal(2);
      expect(part2('12')).to.equal(3);
      expect(part2('13')).to.equal(4);
      expect(part2('14')).to.equal(5);
      expect(part2('15')).to.equal(6);
      expect(part2('16')).to.equal(7);
      expect(part2('17')).to.equal(8);
      expect(part2('18')).to.equal(9); // (3 ** 2) * 2
      expect(part2('19')).to.equal(11);
      expect(part2('20')).to.equal(13);
      expect(part2('21')).to.equal(15);
      expect(part2('22')).to.equal(17);
      expect(part2('23')).to.equal(19);
      expect(part2('24')).to.equal(21);
      expect(part2('25')).to.equal(23);
      expect(part2('26')).to.equal(25);
      expect(part2('27')).to.equal(27); // 3 ** 3

      expect(part2('28')).to.equal(1);
      expect(part2('29')).to.equal(2);
      expect(part2('30')).to.equal(3);
      expect(part2('31')).to.equal(4);
      expect(part2('32')).to.equal(5);
      expect(part2('33')).to.equal(6);
      expect(part2('34')).to.equal(7);
      expect(part2('35')).to.equal(8);
      expect(part2('36')).to.equal(9);
      expect(part2('37')).to.equal(10);
      expect(part2('38')).to.equal(11);
      expect(part2('39')).to.equal(12);
      expect(part2('40')).to.equal(13);
      expect(part2('41')).to.equal(14);
      expect(part2('42')).to.equal(15);
      expect(part2('43')).to.equal(16);
      expect(part2('44')).to.equal(17);
      expect(part2('45')).to.equal(18);
      expect(part2('46')).to.equal(19);
      expect(part2('47')).to.equal(20);
      expect(part2('48')).to.equal(21);
      expect(part2('49')).to.equal(22);
      expect(part2('50')).to.equal(23);
      expect(part2('51')).to.equal(24);
      expect(part2('52')).to.equal(25);
      expect(part2('53')).to.equal(26);
      expect(part2('54')).to.equal(27); // (3 ** 3) * 2
      expect(part2('55')).to.equal(29);
      expect(part2('56')).to.equal(31);
      expect(part2('57')).to.equal(33);
      expect(part2('58')).to.equal(35);
      expect(part2('59')).to.equal(37);
      expect(part2('60')).to.equal(39);
      expect(part2('61')).to.equal(41);
      expect(part2('62')).to.equal(43);
      expect(part2('63')).to.equal(45);
      expect(part2('64')).to.equal(47);
      expect(part2('65')).to.equal(49);
      expect(part2('66')).to.equal(51);
      expect(part2('67')).to.equal(53);
      expect(part2('68')).to.equal(55);
      expect(part2('69')).to.equal(57);
      expect(part2('70')).to.equal(59);
      expect(part2('71')).to.equal(61);
      expect(part2('72')).to.equal(63);
      expect(part2('73')).to.equal(65);
      expect(part2('74')).to.equal(67);
      expect(part2('75')).to.equal(69);
      expect(part2('76')).to.equal(71);
      expect(part2('77')).to.equal(73);
      expect(part2('78')).to.equal(75);
      expect(part2('79')).to.equal(77);
      expect(part2('80')).to.equal(79);
      expect(part2('81')).to.equal(81); // 3 ** 4

      expect(part2('82')).to.equal(1);
      expect(part2('83')).to.equal(2);
      expect(part2('84')).to.equal(3);
      expect(part2('85')).to.equal(4);
      expect(part2('86')).to.equal(5);
      expect(part2('87')).to.equal(6);
      expect(part2('88')).to.equal(7);
      expect(part2('89')).to.equal(8);
      expect(part2('90')).to.equal(9);
      expect(part2('91')).to.equal(10);
      expect(part2('92')).to.equal(11);
      expect(part2('93')).to.equal(12);
      expect(part2('94')).to.equal(13);
      expect(part2('95')).to.equal(14);
      expect(part2('96')).to.equal(15);
      expect(part2('97')).to.equal(16);
      expect(part2('98')).to.equal(17);
      expect(part2('99')).to.equal(18);
      expect(part2('100')).to.equal(19);
    });

    it('should work for part 2 input', () => {
      expect(part2(input)).to.equal(1410967);
    });
  });
});
