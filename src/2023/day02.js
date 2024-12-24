function parse(input) {
  let lines = input.split("\n");
  return lines.map(line => {
    let [game, ...rounds] = line.split(/[:; ] /);
    game = +game.split(" ")[1];
    rounds = rounds.map(round => {
      return round.split(", ").map(d => {
        let [count, color] = d.split(" ");
        return { count: +count, color };
      });
    });
    return { game, rounds };
  });
}

export function part1(input) {
  let games = parse(input);
  let good = games.filter(({ rounds }) =>
    rounds.flat().every(({ color, count }) => {
      return (
        (color === "red" && count <= 12) ||
        (color === "green" && count <= 13) ||
        (color === "blue" && count <= 14)
      );
    }),
  );
  return good.reduce((acc, { game }) => acc + game, 0);
}

export function part2(input) {
  let games = parse(input);
  let powers = games.map(({ rounds }) => {
    let max = ["red", "green", "blue"].map(c => {
      let counts = rounds.flat().filter(({ color }) => color === c);
      return Math.max(...counts.map(({ count }) => count), 0);
    });
    return max[0] * max[1] * max[2];
  });
  return powers.reduce((acc, power) => acc + power, 0);
}
