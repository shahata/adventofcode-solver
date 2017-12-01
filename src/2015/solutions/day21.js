const table = ` Weapons:    Cost  Damage  Armor
                Dagger        8     4       0
                Shortsword   10     5       0
                Warhammer    25     6       0
                Longsword    40     7       0
                Greataxe     74     8       0

                Armor:      Cost  Damage  Armor
                Leather      13     0       1
                Chainmail    31     0       2
                Splintmail   53     0       3
                Bandedmail   75     0       4
                Platemail   102     0       5

                Rings:      Cost  Damage  Armor
                Damage +1    25     1       0
                Damage +2    50     2       0
                Damage +3   100     3       0
                Defense +1   20     0       1
                Defense +2   40     0       2
                Defense +3   80     0       3`;

function day(input) {
  const items = table.split('\n')
                   .filter(x => !x.match(/^\s*$/))
                   .map(x => x.match(/^\s*([^:]+):?\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)\s*$/))
                   .reduce((state, x) => {
                     if (x[2] === 'Cost') {
                       state.currentCategory = x[1].trim().toLowerCase();
                       state[state.currentCategory] = [];
                     } else {
                       state[state.currentCategory].push({
                         name: x[1].trim().toLowerCase(),
                         cost: parseInt(x[2], 10),
                         damage: parseInt(x[3], 10),
                         armor: parseInt(x[4], 10)
                       });
                     }
                     return state;
                   }, {});

  const [hit, damage, armor] = input.match(/\d+/g).map(x => parseInt(x, 10));
  const boss = {hit, damage, armor};
  let options = [];

  items.armor.push({name: 'nothing', cost: 0, damage: 0, armor: 0});
  items.rings.push({name: 'nothing', cost: 0, damage: 0, armor: 0});
  items.weapons.forEach(weapon => {
    items.armor.forEach(armor => {
      items.rings.forEach(ring1 => {
        items.rings.forEach(ring2 => {
          options.push([weapon, armor, ring1, ring2]);
        });
      });
    });
  });

  options = options.map(x => x.reduce((sum, x) => ({
    cost: sum.cost + x.cost,
    damage: sum.damage + x.damage,
    armor: sum.armor + x.armor
  }))).sort((a, b) => a.cost - b.cost);

  const win = options.filter(x => Math.ceil(100 / Math.max(1, boss.damage - x.armor)) >= Math.ceil(boss.hit / Math.max(1, x.damage - boss.armor)));
  const lose = options.filter(x => Math.ceil(100 / Math.max(1, boss.damage - x.armor)) < Math.ceil(boss.hit / Math.max(1, x.damage - boss.armor)));

  const part1 = win.shift().cost;
  const part2 = lose.pop().cost;
  return [part1, part2];
}

module.exports = {day};
