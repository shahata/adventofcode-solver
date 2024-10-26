function check1(players, cards) {
  return cards.indexOf(Math.max(...cards));
}

function check2(players, cards) {
  if (players.every((x, i) => x.length >= cards[i])) {
    const results = subGame(
      players.map((p, i) => p.slice(0, cards[i])),
      check2,
    );
    return results.findIndex(x => x > 0);
  } else {
    return check1(players, cards);
  }
}

function subGame(players, check) {
  const visited = new Set();
  while (players.filter(x => x.length > 0).length > 1) {
    const serialized = players.map(p => p.join(",")).join("#");
    if (visited.has(serialized)) {
      return players.map((x, i) => (i === 0 ? 1 : 0));
    }
    visited.add(serialized);

    const cards = players.map(player => player.shift() || 0);
    const winner = check(players, cards);
    players[winner] = players[winner]
      .concat(cards.splice(winner, 1))
      .concat(cards);
  }
  return players.map(p =>
    p.map((x, i) => x * (p.length - i)).reduce((a, b) => a + b, 0),
  );
}

function parse(input) {
  return input
    .split("\n\n")
    .map(player => player.split("\n").slice(1).map(Number));
}

export function part1(input) {
  const players = parse(input);
  const results = subGame(players, check1);
  return results.reduce((a, b) => a + b, 0);
}

export function part2(input) {
  const players = parse(input);
  const results = subGame(players, check2);
  return results.reduce((a, b) => a + b, 0);
}
