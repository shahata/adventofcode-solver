function getHandType(hand) {
  if (hand.includes(1)) {
    return Math.max(
      ...[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(option => {
        const i = hand.indexOf(1);
        return getHandType([...hand.slice(0, i), option, ...hand.slice(i + 1)]);
      }),
    );
  }
  const counts = hand.reduce((acc, card) => {
    acc[card] = acc[card] || 0;
    acc[card]++;
    return acc;
  }, {});
  const countsArray = Object.values(counts);
  const isFiveOfAKind = countsArray.includes(5);
  const isFourOfAKind = countsArray.includes(4);
  const isFullHouse = countsArray.includes(3) && countsArray.includes(2);
  if (isFiveOfAKind) return 8;
  if (isFourOfAKind) return 7;
  if (isFullHouse) return 6;
  if (countsArray.includes(3)) return 5;
  if (countsArray.filter(count => count === 2).length === 2) return 4;
  if (countsArray.includes(2)) return 3;
  return 2;
}

function compare(a, b) {
  const handTypeA = getHandType(a);
  const handTypeB = getHandType(b);
  if (handTypeA !== handTypeB) return handTypeA - handTypeB;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return a[i] - b[i];
  }
}

function cardNumber(card) {
  const number = card;
  if (number === 'T') return 10;
  if (number === 'J') return 11;
  if (number === 'Q') return 12;
  if (number === 'K') return 13;
  if (number === 'A') return 14;
  return +number;
}

export function part1(input, jokers = false) {
  const hands = input
    .split('\n')
    .map(line => {
      let [hand, bid] = line.split(' ');
      bid = +bid;
      hand = hand
        .split('')
        .map(card =>
          jokers && cardNumber(card) === 11 ? 1 : cardNumber(card),
        );
      return { bid, hand };
    })
    .sort((a, b) => compare(a.hand, b.hand));

  return hands.reduce((acc, hand, index) => acc + hand.bid * (index + 1), 0);
}

export function part2(input) {
  return part1(input, true);
}
