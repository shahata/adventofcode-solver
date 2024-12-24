export function part1(input) {
  let players = input.split("\n").map(line => +line.split(": ")[1]);
  let score = [0, 0];
  let i = 1;
  let player = 0;
  while (score[0] < 1000 && score[1] < 1000) {
    let x = i % 100;
    players[player] += (3 * (x + 1)) % 10;
    if (players[player] > 10) players[player] -= 10;
    score[player] += players[player];
    player = (player + 1) % 2;
    i += 3;
  }
  return Math.min(...score) * (i - 1);
}

function play(currPlayer, prevPlayer, memory = new Map()) {
  if (prevPlayer.score >= 21) return [0, 1];

  let key = JSON.stringify({ player1: currPlayer, player2: prevPlayer });
  let result = memory.get(key);
  if (result) return result;

  let wins = [0, 0];
  let odds = { 3: 1, 9: 1, 4: 3, 8: 3, 5: 6, 7: 6, 6: 7 };
  for (let key in odds) {
    let position = currPlayer.position + +key;
    if (position > 10) position -= 10;
    let next = play(
      prevPlayer,
      { position, score: currPlayer.score + position },
      memory,
    );
    wins[0] += next[1] * odds[key];
    wins[1] += next[0] * odds[key];
  }

  memory.set(key, wins);
  return wins;
}

export function part2(input) {
  let players = input.split("\n").map(line => +line.split(": ")[1]);
  let wins = play(...players.map(p => ({ position: p, score: 0 })));
  return Math.max(...wins);
}
