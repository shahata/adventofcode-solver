function calcOptions() {
  const items = {
    weapons: [
      { name: "dagger", cost: 8, damage: 4, armor: 0 },
      { name: "shortsword", cost: 10, damage: 5, armor: 0 },
      { name: "warhammer", cost: 25, damage: 6, armor: 0 },
      { name: "longsword", cost: 40, damage: 7, armor: 0 },
      { name: "greataxe", cost: 74, damage: 8, armor: 0 },
    ],
    armor: [
      { name: "leather", cost: 13, damage: 0, armor: 1 },
      { name: "chainmail", cost: 31, damage: 0, armor: 2 },
      { name: "splintmail", cost: 53, damage: 0, armor: 3 },
      { name: "bandedmail", cost: 75, damage: 0, armor: 4 },
      { name: "platemail", cost: 102, damage: 0, armor: 5 },
      { name: "nothing", cost: 0, damage: 0, armor: 0 },
    ],
    rings: [
      { name: "damage +1", cost: 25, damage: 1, armor: 0 },
      { name: "damage +2", cost: 50, damage: 2, armor: 0 },
      { name: "damage +3", cost: 100, damage: 3, armor: 0 },
      { name: "defense +1", cost: 20, damage: 0, armor: 1 },
      { name: "defense +2", cost: 40, damage: 0, armor: 2 },
      { name: "defense +3", cost: 80, damage: 0, armor: 3 },
      { name: "nothing", cost: 0, damage: 0, armor: 0 },
    ],
  };

  let options = [];

  items.weapons.forEach(weapon => {
    items.armor.forEach(armor => {
      items.rings.forEach(ring1 => {
        items.rings.forEach(ring2 => {
          if (ring1 !== ring2) {
            options.push([weapon, armor, ring1, ring2]);
          }
        });
      });
    });
  });

  return options
    .map(x =>
      x.reduce((sum, x) => ({
        cost: sum.cost + x.cost,
        damage: sum.damage + x.damage,
        armor: sum.armor + x.armor,
      })),
    )
    .sort((a, b) => a.cost - b.cost);
}

function parse(input) {
  let [hit, damage, armor] = input.match(/\d+/g).map(Number);
  return { hit, damage, armor };
}

export function part1(input) {
  let boss = parse(input);
  let options = calcOptions();
  let win = options.filter(
    x =>
      Math.ceil(100 / Math.max(1, boss.damage - x.armor)) >=
      Math.ceil(boss.hit / Math.max(1, x.damage - boss.armor)),
  );
  return win.shift().cost;
}

export function part2(input) {
  let boss = parse(input);
  let options = calcOptions();
  let lose = options.filter(
    x =>
      Math.ceil(100 / Math.max(1, boss.damage - x.armor)) <
      Math.ceil(boss.hit / Math.max(1, x.damage - boss.armor)),
  );
  return lose.pop().cost;
}
