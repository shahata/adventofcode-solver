'use strict';

function day(input) {
  const spells = {
    Missile: {
      mana: 53,
      effect: game => {
        return Object.assign({}, game, {
          boss: Object.assign({}, game.boss, {hit: game.boss.hit - 4})
        });
      },
      turns: 1
    },
    Drain: {
      mana: 73,
      effect: game => {
        return Object.assign({}, game, {
          boss: Object.assign({}, game.boss, {hit: game.boss.hit - 2}),
          hero: Object.assign({}, game.hero, {hit: game.hero.hit + 2})
        });
      },
      turns: 1
    },
    Shield: {
      mana: 113,
      effect: game => {
        return Object.assign({}, game, {
          hero: Object.assign({}, game.hero, {armor: 7})
        });
      },
      turns: 6
    },
    Poison: {
      mana: 173,
      effect: game => {
        return Object.assign({}, game, {
          boss: Object.assign({}, game.boss, {hit: game.boss.hit - 3})
        });
      },
      turns: 6
    },
    Recharge: {
      mana: 229,
      effect: game => {
        return Object.assign({}, game, {
          hero: Object.assign({}, game.hero, {mana: game.hero.mana + 101})
        });
      },
      turns: 5
    }
  };

  function canSpell(spell, game) {
    return game.hero.mana >= spells[spell].mana && game.active[spell] === 0;
  }

  function runSpells(game) {
    game = Object.assign({}, game, {
      hero: Object.assign({}, game.hero, {armor: 0})
    });
    for (const spell in game.active) {
      if (game.active[spell] > 0) {
        game = spells[spell].effect(game);
        game = Object.assign({}, game, {
          active: Object.assign({}, game.active, {[spell]: game.active[spell] - 1})
        });
      }
    }
    return game;
  }

  function castSpell(spell, game) {
    return Object.assign({}, game, {
      hero: Object.assign({}, game.hero, {mana: game.hero.mana - spells[spell].mana}),
      active: Object.assign({}, game.active, {[spell]: spells[spell].turns})
    });
  }

  function playBoss(game) {
    return Object.assign({}, game, {
      hero: Object.assign({}, game.hero, {hit: game.hero.hit - Math.max(1, game.boss.damage - game.hero.armor)})
    });
  }

  function memoize(fn) {
    const memo = {};
    return function (x) {
      const s = JSON.stringify(x);
      if (!memo[s]) {
        memo[s] = fn(x);
      }
      return memo[s];
    };
  }

  const play = memoize(game => {
    if (game.boss.hit <= 0) {
      return 0;
    } else if (game.hero.hit <= 0) {
      return Infinity;
    }
    let min = Infinity;
    game = runSpells(game);
    for (const spell in spells) {
      if (canSpell(spell, game)) {
        let move = castSpell(spell, game);
        move = runSpells(move);
        move = playBoss(move);
        min = Math.min(spells[spell].mana + play(move), min);
      }
    }
    return min;
  });

  const [hit, damage] = input.match(/\d+/g);
  const hero = {hit: 50, mana: 500, armor: 0};
  const boss = {hit: parseInt(hit, 10), damage: parseInt(damage, 10), armor: 0};
  const active = Object.keys(spells).reduce((obj, spell) => Object.assign(obj, {[spell]: 0}), {});

  const part1 = play({hero, boss, active});
  hero.hit--;
  boss.damage++;
  const part2 = play({hero, boss, active});

  return [part1, part2];
}

module.exports = {day};
