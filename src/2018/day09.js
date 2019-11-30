function add(value, position) {
  const newItem = { value };
  newItem.next = position ? position.next : newItem;
  newItem.prev = position || newItem;
  if (position) {
    position.next.prev = newItem;
    position.next = newItem;
  }
  return newItem;
}

function remove(position) {
  position.prev.next = position.next;
  position.next.prev = position.prev;
  return position;
}

export function part1(input) {
  const [, players, lastMarble] = input
    .match(/(\d+) players; last marble is worth (\d+)/)
    .map(x => parseInt(x));

  const score = new Map();
  let player = 0;
  let marble = 1;
  let pointer = add(0);

  while (marble <= lastMarble) {
    if (marble % 23 === 0) {
      pointer = remove(pointer.prev.prev.prev.prev.prev.prev.prev);
      score.set(player, (score.get(player) || 0) + marble + pointer.value);
      pointer = pointer.next;
    } else {
      pointer = add(marble, pointer.next);
    }
    marble++;
    player = (player + 1) % players;
  }
  return Math.max(...Array.from(score.values()));
}

export function part2(input) {
  const [, players, lastMarble] = input
    .match(/(\d+) players; last marble is worth (\d+)/)
    .map(x => parseInt(x));
  return part1(`${players} players; last marble is worth ${lastMarble * 100}`);
}
