function getHandType(hand) {
  if (hand.includes(1)) {
    return Math.max(
      ...[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(option => {
        let i = hand.indexOf(1);
        return getHandType([...hand.slice(0, i), option, ...hand.slice(i + 1)]);
      }),
    );
  }
  let counts = hand.reduce((acc, card) => {
    acc[card] = acc[card] || 0;
    acc[card]++;
    return acc;
  }, {});
  let countsArray = Object.values(counts);
  if (countsArray.includes(5)) return 6;
  if (countsArray.includes(4)) return 5;
  if (countsArray.includes(3) && countsArray.includes(2)) return 4;
  if (countsArray.includes(3)) return 3;
  if (countsArray.filter(count => count === 2).length === 2) return 2;
  if (countsArray.includes(2)) return 1;
  return 0;
}

function compare(a, b) {
  let handTypeA = getHandType(a);
  let handTypeB = getHandType(b);
  if (handTypeA !== handTypeB) return handTypeA - handTypeB;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return a[i] - b[i];
  }
}

function cardNumber(card, jokers) {
  let number = card;
  if (number === "T") return 10;
  if (number === "J") return jokers ? 1 : 11;
  if (number === "Q") return 12;
  if (number === "K") return 13;
  if (number === "A") return 14;
  return +number;
}

export function part1(input, jokers = false) {
  let hands = input
    .split("\n")
    .map(line => {
      let [hand, bid] = line.split(" ");
      return {
        bid: +bid,
        hand: hand.split("").map(card => cardNumber(card, jokers)),
      };
    })
    .sort((a, b) => compare(a.hand, b.hand));

  return hands.reduce((acc, hand, index) => acc + hand.bid * (index + 1), 0);
}

export function part2(input) {
  return part1(input, true);
}
