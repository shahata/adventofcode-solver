const spells = {
  Missile: {
    mana: 53,
    effect: game => {
      return { ...game, boss: { ...game.boss, hit: game.boss.hit - 4 } };
    },
    turns: 1,
  },
  Drain: {
    mana: 73,
    effect: game => {
      return {
        ...game,
        boss: { ...game.boss, hit: game.boss.hit - 2 },
        hero: { ...game.hero, hit: game.hero.hit + 2 },
      };
    },
    turns: 1,
  },
  Shield: {
    mana: 113,
    effect: game => {
      return { ...game, hero: { ...game.hero, armor: 7 } };
    },
    turns: 6,
  },
  Poison: {
    mana: 173,
    effect: game => {
      return { ...game, boss: { ...game.boss, hit: game.boss.hit - 3 } };
    },
    turns: 6,
  },
  Recharge: {
    mana: 229,
    effect: game => {
      return { ...game, hero: { ...game.hero, mana: game.hero.mana + 101 } };
    },
    turns: 5,
  },
};

function canSpell(spell, game) {
  return game.hero.mana >= spells[spell].mana && game.active[spell] === 0;
}

function runSpells(game) {
  game = { ...game, hero: { ...game.hero, armor: 0 } };
  for (let spell in game.active) {
    if (game.active[spell] > 0) {
      game = spells[spell].effect(game);
      game = {
        ...game,
        active: { ...game.active, [spell]: game.active[spell] - 1 },
      };
    }
  }
  return game;
}

function castSpell(spell, game) {
  return {
    ...game,
    hero: { ...game.hero, mana: game.hero.mana - spells[spell].mana },
    active: { ...game.active, [spell]: spells[spell].turns },
  };
}

function playBoss(game) {
  return {
    ...game,
    hero: {
      ...game.hero,
      hit: game.hero.hit - Math.max(1, game.boss.damage - game.hero.armor),
    },
  };
}

function memoize(fn) {
  let memo = {};
  return function (...x) {
    let s = JSON.stringify(x);
    return (memo[s] = memo[s] ?? fn(...x));
  };
}

let play = memoize(game => {
  if (game.boss.hit <= 0) {
    return 0;
  } else if (game.hero.hit <= 0) {
    return Infinity;
  }
  let min = Infinity;
  game = runSpells(game);
  for (let spell in spells) {
    if (canSpell(spell, game)) {
      let move = castSpell(spell, game);
      move = runSpells(move);
      move = playBoss(move);
      min = Math.min(spells[spell].mana + play(move), min);
    }
  }
  return min;
});

function parse(input, initialHit, initialMana) {
  let [hit, damage] = input.match(/\d+/g);
  let hero = { hit: initialHit, mana: initialMana, armor: 0 };
  let boss = {
    hit: +hit,
    damage: +damage,
    armor: 0,
  };
  let active = Object.keys(spells).reduce(
    (obj, spell) => ({ ...obj, [spell]: 0 }),
    {},
  );
  return { hero, boss, active };
}

export function part1(input, initialHit = 50, initialMana = 500) {
  return play(parse(input, initialHit, initialMana));
}

export function part2(input, initialHit = 50, initialMana = 500) {
  let state = parse(input, initialHit, initialMana);
  state.hero.hit--;
  state.boss.damage++;
  return play(state);
}
