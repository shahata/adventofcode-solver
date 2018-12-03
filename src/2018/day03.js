function parseClaims(input) {
  return input.split('\n').map(claim => {
    const [, id, x, y, w, h] = claim
      .match(/^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/)
      .map(x => parseInt(x));
    return { id, x, y, w, h };
  });
}

function resolveClaims(claims) {
  const fabric = new Map();
  claims.forEach(claim => {
    for (let i = 0; i < claim.w; i++) {
      for (let j = 0; j < claim.h; j++) {
        const point = `(${claim.x + i}, ${claim.y + j})`;
        fabric.set(point, (fabric.get(point) || []).concat(claim.id));
      }
    }
  });
  return fabric;
}

function getConflicts(fabric) {
  return Array.from(fabric.values()).filter(x => x.length >= 2);
}

function part1(input) {
  const claims = parseClaims(input);
  const fabric = resolveClaims(claims);
  const conflicts = getConflicts(fabric);
  return conflicts.length;
}

function part2(input) {
  const claims = parseClaims(input);
  const fabric = resolveClaims(claims);
  const conflicts = getConflicts(fabric);
  const ok = new Set(claims.map(x => x.id));
  conflicts.forEach(x => x.forEach(id => ok.delete(id)));
  return Array.from(ok).shift();
}

module.exports = { part1, part2 };
