function parseClaims(input) {
  return input.split("\n").map(claim => {
    let [, id, x, y, w, h] = claim
      .match(/^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/)
      .map(Number);
    return { id, x, y, w, h };
  });
}

function resolveClaims(claims) {
  let fabric = new Map();
  claims.forEach(claim => {
    for (let i = 0; i < claim.w; i++) {
      for (let j = 0; j < claim.h; j++) {
        let point = `(${claim.x + i}, ${claim.y + j})`;
        fabric.set(point, (fabric.get(point) || []).concat(claim.id));
      }
    }
  });
  return fabric;
}

function getConflicts(fabric) {
  return Array.from(fabric.values()).filter(x => x.length >= 2);
}

export function part1(input) {
  let claims = parseClaims(input);
  let fabric = resolveClaims(claims);
  let conflicts = getConflicts(fabric);
  return conflicts.length;
}

export function part2(input) {
  let claims = parseClaims(input);
  let fabric = resolveClaims(claims);
  let conflicts = getConflicts(fabric);
  let ok = new Set(claims.map(x => x.id));
  conflicts.forEach(x => x.forEach(id => ok.delete(id)));
  return Array.from(ok).shift();
}
